"""Fase 2: valida JWT de Supabase Auth (JWKS) y resuelve el usuario local.

El frontend/Supabase emiten el token; FastAPI solo lo verifica
(firma + aud + iss + exp) y nunca confía en el cliente para authz.
"""

from __future__ import annotations

import uuid
from functools import lru_cache
from pathlib import Path
import os

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jwt import PyJWKClient
from sqlalchemy.orm import Session

from .db import SessionLocal
from .models import Account, User


def _env(key: str) -> str:
    if os.environ.get(key):
        return os.environ[key]
    env_file = Path(__file__).resolve().parents[2] / ".env"
    for line in env_file.read_text().splitlines():
        if line.startswith(f"{key}="):
            return line.split("=", 1)[1].strip()
    raise RuntimeError(f"{key} no encontrado (env ni .env raíz)")


SUPABASE_URL = _env("SUPABASE_URL")
_JWKS_URL = f"{SUPABASE_URL}/auth/v1/.well-known/jwks.json"
_ISSUER = f"{SUPABASE_URL}/auth/v1"

bearer_scheme = HTTPBearer(auto_error=True)


@lru_cache(maxsize=1)
def _jwks_client() -> PyJWKClient:
    return PyJWKClient(_JWKS_URL)


def verify_token(token: str) -> dict:
    """Decodifica y valida el access_token. Lanza 401 si no es válido."""
    try:
        key = _jwks_client().get_signing_key_from_jwt(token).key
        return jwt.decode(
            token,
            key,
            algorithms=["ES256"],
            audience="authenticated",
            issuer=_ISSUER,
            leeway=30,
        )
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido"
        )


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    claims = verify_token(creds.credentials)
    try:
        auth_id = uuid.UUID(claims["sub"])
    except (KeyError, ValueError):
        raise HTTPException(status_code=401, detail="Token sin sub válido")
    email = (claims.get("email") or "").strip().lower()
    if not email:
        raise HTTPException(status_code=401, detail="Token sin email")

    user = db.query(User).filter(User.auth_id == auth_id).first()
    if user:
        return user
    # Alta perezosa: primer login crea cuenta personal + usuario.
    account = Account(name=email.split("@")[0])
    db.add(account)
    db.flush()
    user = User(account_id=account.id, auth_id=auth_id, email=email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def require_account_project(project_id: uuid.UUID, user: User, db: Session):
    """Devuelve el proyecto si pertenece a la cuenta del usuario, si no 404."""
    from .models import Project

    project = (
        db.query(Project)
        .filter(Project.id == project_id, Project.account_id == user.account_id)
        .first()
    )
    if not project:
        raise HTTPException(status_code=404, detail="Proyecto no encontrado")
    return project
