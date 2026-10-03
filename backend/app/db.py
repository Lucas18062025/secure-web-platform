"""Engine + sesión + Base. DATABASE_URL: variable de entorno primero, .env raíz después."""

from __future__ import annotations

import os
from pathlib import Path
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


def _database_url() -> str:
    if os.environ.get("DATABASE_URL"):
        url = os.environ["DATABASE_URL"]
    else:
        env_file = Path(__file__).resolve().parents[2] / ".env"
        url = ""
        for line in env_file.read_text().splitlines():
            if line.startswith("DATABASE_URL="):
                url = line.split("=", 1)[1].strip()
                break
        if not url:
            raise RuntimeError("DATABASE_URL no encontrado (env ni .env raíz)")
    # psycopg v3 necesita el dialecto explícito
    return url.replace("postgresql://", "postgresql+psycopg://")


class Base(DeclarativeBase):
    pass


engine = create_engine(_database_url(), pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
