"""Fase 2: CRUD mínimo de projects/targets con authz server-side.

Toda operación verifica que el proyecto/target pertenezca a la cuenta
del usuario del token. Ocultar botones en el frontend no alcanza.
"""

from __future__ import annotations

import ipaddress
import uuid
from datetime import datetime, timezone
from urllib.parse import urlparse

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from .auth import get_current_user, require_account_project, get_db
from .models import Project, Scan, Finding, Target, User
from .schemas import (
    ProjectCreate,
    ProjectOut,
    TargetCreate,
    TargetOut,
    ScanCreate,
    ScanOut,
    FindingOut,
    CompareOut,
)

router = APIRouter()


def _approved_host(url: str) -> tuple[str, str]:
    """Valida URL y devuelve (host, url). Bloquea lo obvio;
    el pin de DNS y metadata-cloud van en el worker (fase 3)."""
    try:
        parts = urlparse(url.strip())
    except ValueError:
        raise HTTPException(status_code=422, detail="URL inválida")
    if parts.scheme not in ("http", "https") or not parts.hostname:
        raise HTTPException(status_code=422, detail="Solo http(s) con host válido")
    host = parts.hostname.lower()
    if host in ("localhost",):
        raise HTTPException(status_code=422, detail="Host no permitido")
    try:
        ip = ipaddress.ip_address(host)
        if not ip.is_global:
            raise HTTPException(status_code=422, detail="IP no pública")
    except ValueError:
        pass  # es nombre DNS: el worker lo resuelve y fija (fase 3)
    return host, url.strip()


@router.post("/api/projects", response_model=ProjectOut, status_code=201)
def create_project(
    body: ProjectCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    project = Project(account_id=user.account_id, name=body.name.strip())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.get("/api/projects", response_model=list[ProjectOut])
def list_projects(
    user: User = Depends(get_current_user), db: Session = Depends(get_db)
):
    return (
        db.query(Project)
        .filter(Project.account_id == user.account_id)
        .order_by(Project.created_at.desc())
        .all()
    )


@router.post("/api/targets", response_model=TargetOut, status_code=201)
def create_target(
    body: TargetCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    require_account_project(body.project_id, user, db)
    host, clean_url = _approved_host(body.url)
    consent = body.consent_by.strip()
    if len(consent) < 3:
        raise HTTPException(status_code=422, detail="Consentimiento insuficiente")
    target = Target(
        project_id=body.project_id,
        host=host,
        original_url=clean_url,
        consent_by=consent,
        consent_at=datetime.now(timezone.utc),
    )
    db.add(target)
    db.commit()
    db.refresh(target)
    return target


@router.get("/api/targets", response_model=list[TargetOut])
def list_targets(
    project_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    require_account_project(project_id, user, db)
    return (
        db.query(Target)
        .filter(Target.project_id == project_id)
        .order_by(Target.created_at.desc())
        .all()
    )


def require_account_scan(scan_id: uuid.UUID, user: User, db: Session) -> Scan:
    """Devuelve el scan si su target pertenece a la cuenta del usuario."""
    scan = (
        db.query(Scan)
        .join(Target, Scan.target_id == Target.id)
        .join(Project, Target.project_id == Project.id)
        .filter(Scan.id == scan_id, Project.account_id == user.account_id)
        .first()
    )
    if not scan:
        raise HTTPException(status_code=404, detail="Scan no encontrado")
    return scan


@router.post("/api/scans", response_model=ScanOut, status_code=201)
def create_scan(
    body: ScanCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if body.profile != "passive-python":
        raise HTTPException(status_code=422, detail="Perfil no soportado")
    target = (
        db.query(Target)
        .join(Project, Target.project_id == Project.id)
        .filter(Target.id == body.target_id, Project.account_id == user.account_id)
        .first()
    )
    if not target:
        raise HTTPException(status_code=404, detail="Target no encontrado")
    scan = Scan(target_id=target.id, status="queued", profile=body.profile)
    db.add(scan)
    db.commit()
    db.refresh(scan)
    return scan


@router.get("/api/scans/compare", response_model=CompareOut)
def compare_scans(
    base_id: uuid.UUID,
    other_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Compara dos scans del MISMO target: nuevos, corregidos, persistentes."""
    base = require_account_scan(base_id, user, db)
    other = require_account_scan(other_id, user, db)
    if base.target_id != other.target_id:
        raise HTTPException(status_code=422, detail="Targets distintos")
    base_keys = {f.key: f for f in db.query(Finding).filter(Finding.scan_id == base.id).all()}
    other_keys = {f.key: f for f in db.query(Finding).filter(Finding.scan_id == other.id).all()}
    return CompareOut(
        base_id=base.id,
        other_id=other.id,
        new=[f for k, f in other_keys.items() if k not in base_keys],
        fixed=[f for k, f in base_keys.items() if k not in other_keys],
        persisting=[f for k, f in other_keys.items() if k in base_keys],
    )


@router.get("/api/scans/{scan_id}", response_model=ScanOut)
def get_scan(
    scan_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return require_account_scan(scan_id, user, db)


@router.get("/api/scans/{scan_id}/findings", response_model=list[FindingOut])
def list_scan_findings(
    scan_id: uuid.UUID,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    scan = require_account_scan(scan_id, user, db)
    return (
        db.query(Finding)
        .filter(Finding.scan_id == scan.id)
        .order_by(Finding.severity.desc(), Finding.created_at)
        .all()
    )
