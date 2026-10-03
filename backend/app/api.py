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
from .models import Project, Target, User
from .schemas import ProjectCreate, ProjectOut, TargetCreate, TargetOut

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
    target = Target(
        project_id=body.project_id,
        host=host,
        original_url=clean_url,
        consent_by=body.consent_by.strip(),
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
