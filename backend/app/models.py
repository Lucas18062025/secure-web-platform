"""Fase 1: accounts, users, projects, targets, scans, findings."""

from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text, func
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column

from .db import Base


def _uuid() -> uuid.UUID:
    return uuid.uuid4()


class Account(Base):
    __tablename__ = "accounts"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class User(Base):
    __tablename__ = "users"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
    account_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("accounts.id", ondelete="CASCADE"))
    auth_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), unique=True
    )  # sub del JWT de Supabase Auth
    email: Mapped[str] = mapped_column(String(254), unique=True)
    display_name: Mapped[str | None] = mapped_column(String(120), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Project(Base):
    __tablename__ = "projects"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
    account_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("accounts.id", ondelete="CASCADE"))
    name: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Target(Base):
    __tablename__ = "targets"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
    project_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("projects.id", ondelete="CASCADE"))
    host: Mapped[str] = mapped_column(String(253))  # host aprobado, sin URL cruda
    original_url: Mapped[str] = mapped_column(String(2048))
    consent_by: Mapped[str] = mapped_column(String(254))  # quién autorizó
    consent_at: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Scan(Base):
    __tablename__ = "scans"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
    target_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("targets.id", ondelete="CASCADE"))
    status: Mapped[str] = mapped_column(String(16), default="queued")  # queued|running|done|failed
    profile: Mapped[str] = mapped_column(String(64), default="zap-baseline")
    origin: Mapped[str] = mapped_column(String(64), default="api")
    started_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    finished_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class Finding(Base):
    __tablename__ = "findings"
    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=_uuid)
    scan_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("scans.id", ondelete="CASCADE"))
    key: Mapped[str] = mapped_column(String(64))  # ej. XSS-01, estable por perfil
    title: Mapped[str] = mapped_column(String(255))
    severity: Mapped[str] = mapped_column(String(16))  # critical|high|medium|low
    technical: Mapped[str] = mapped_column(Text)
    business_impact: Mapped[str] = mapped_column(Text)
    remediation: Mapped[str] = mapped_column(Text)
    compliance: Mapped[list] = mapped_column(JSONB, default=list)
    status: Mapped[str] = mapped_column(String(16), default="open")  # open|fixed|accepted
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
