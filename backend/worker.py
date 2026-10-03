"""Fase 3: worker de escaneo en loop (proceso aparte, nunca en una request).

Flujo por scan: queued (el más viejo, con lock) -> running -> done | failed.
Candados: solo http(s), host == target.host aprobado, todas las IPs
resueltas deben ser globales (bloquea privadas/loopback/link-local/
metadata-cloud), sin seguir redirects fuera del host.

Uso:
    python worker.py          # desde backend/, lee ../.env
    WORKER_POLL_SECONDS=5 python worker.py
"""

from __future__ import annotations

import ipaddress
import os
import socket
import sys
import time
import uuid
from datetime import datetime, timezone
from urllib.parse import urlparse

import httpx

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.db import SessionLocal  # noqa: E402
from app.models import Finding, Scan, Target  # noqa: E402
from app.profiles import run_passive  # noqa: E402

POLL_SECONDS = int(os.environ.get("WORKER_POLL_SECONDS", "5"))
TIMEOUT = 20
RETRIES = int(os.environ.get("WORKER_RETRIES", "2"))
RETRY_DELAY = int(os.environ.get("WORKER_RETRY_DELAY", "10"))
REQUEST_DELAY = int(os.environ.get("WORKER_REQUEST_DELAY", "2"))  # cortesía


def _resolve_global_ips(host: str) -> list[str]:
    """Resuelve el host y exige que TODAS las IPs sean públicas globales."""
    try:
        infos = socket.getaddrinfo(host, None, type=socket.SOCK_STREAM)
    except socket.gaierror as e:
        raise ValueError(f"No se pudo resolver {host}: {e}")
    ips = sorted({info[4][0] for info in infos})
    if not ips:
        raise ValueError(f"Sin direcciones para {host}")
    for ip in ips:
        addr = ipaddress.ip_address(ip)
        if not addr.is_global:
            raise ValueError(f"IP no pública bloqueada: {ip}")
    return ips


def _fetch(url: str, approved_host: str) -> httpx.Response:
    parts = urlparse(url)
    if parts.scheme not in ("http", "https"):
        raise ValueError("Solo http(s)")
    if (parts.hostname or "").lower() != approved_host:
        raise ValueError("Host fuera del alcance aprobado")
    with httpx.Client(follow_redirects=False, timeout=TIMEOUT, verify=True) as client:
        resp = client.get(url)
        # Un solo salto manual, solo dentro del mismo host.
        if resp.status_code in (301, 302, 303, 307, 308):
            nxt = urlparse(resp.headers.get("location", ""))
            if (nxt.hostname or "").lower() == approved_host and nxt.scheme in ("http", "https"):
                resp = client.get(resp.headers["location"])
        return resp


def _claim_oldest_queued() -> uuid.UUID | None:
    db = SessionLocal()
    try:
        row = (
            db.query(Scan)
            .filter(Scan.status == "queued")
            .order_by(Scan.created_at)
            .with_for_update(skip_locked=True)
            .first()
        )
        if not row:
            return None
        row.status = "running"
        row.started_at = datetime.now(timezone.utc)
        db.commit()
        return row.id
    finally:
        db.close()


def _finish(scan_id: uuid.UUID, status: str, findings: list[dict]) -> None:
    db = SessionLocal()
    try:
        scan = db.query(Scan).filter(Scan.id == scan_id).first()
        if not scan:
            return
        for f in findings:
            db.add(
                Finding(
                    scan_id=scan.id,
                    key=f["key"],
                    title=f["title"],
                    severity=f["severity"],
                    technical=f["technical"],
                    business_impact=f["business_impact"],
                    remediation=f["remediation"],
                    compliance=f["compliance"],
                    status="open",
                )
            )
        scan.status = status
        scan.finished_at = datetime.now(timezone.utc)
        db.commit()
        print(f"[{scan_id}] {status} ({len(findings)} findings)")
    finally:
        db.close()


def _run_once(scan_id: uuid.UUID) -> None:
    db = SessionLocal()
    try:
        target = (
            db.query(Target).join(Scan, Scan.target_id == Target.id).filter(Scan.id == scan_id).first()
        )
        if not target:
            _finish(scan_id, "failed", [])
            return
        url = target.original_url
    finally:
        db.close()
    try:
        host = urlparse(url).hostname or ""
        _resolve_global_ips(host)
        if host.lower() != target.host.lower():
            raise ValueError("Host fuera del alcance aprobado")
        last_error: Exception | None = None
        for attempt in range(1 + RETRIES):
            try:
                time.sleep(REQUEST_DELAY)  # cortesía: no golpear el target
                resp = _fetch(url, target.host.lower())
                findings = run_passive(url, resp) if resp.status_code < 500 else []
                _finish(scan_id, "done", findings)
                return
            except (httpx.RequestError, httpx.TimeoutException) as e:
                last_error = e
                print(f"[{scan_id}] intento {attempt + 1} falló (red): {e}")
                time.sleep(RETRY_DELAY)
        print(f"[{scan_id}] failed tras reintentos: {last_error}")
        _finish(scan_id, "failed", [])
    except Exception as e:
        print(f"[{scan_id}] failed: {e}")
        _finish(scan_id, "failed", [])


def _requeue_stuck() -> int:
    """Al arrancar: los scans en running son de un worker muerto. A la cola."""
    db = SessionLocal()
    try:
        n = (
            db.query(Scan)
            .filter(Scan.status == "running")
            .update({"status": "queued", "started_at": None}, synchronize_session=False)
        )
        db.commit()
        return n
    finally:
        db.close()


def main() -> None:
    stuck = _requeue_stuck()
    if stuck:
        print(f"worker fase 3: {stuck} scan(s) colgado(s) devueltos a queued")
    print(f"worker fase 3: perfil passive-python, poll cada {POLL_SECONDS}s")
    while True:
        try:
            scan_id = _claim_oldest_queued()
            if scan_id:
                _run_once(scan_id)
            else:
                time.sleep(POLL_SECONDS)
        except KeyboardInterrupt:
            print("worker detenido")
            break
        except Exception as e:
            print(f"loop error: {e}")
            time.sleep(POLL_SECONDS)


if __name__ == "__main__":
    main()
