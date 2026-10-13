"""Schemas pydantic fase 2: projects + targets."""

from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, Field, field_validator


def _clean_text(v: str, max_len: int) -> str:
    t = v.replace("\u0000", "")
    t = "".join(ch for ch in t if ord(ch) >= 32 or ch in ("\n", "\t"))
    t = t.replace("<", "").replace(">", "").replace('"', "").replace("'", "").replace("`", "")
    t = " ".join(t.split()).strip()
    return t[:max_len]


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)

    @field_validator("name")
    @classmethod
    def _sanitize_name(cls, v: str) -> str:
        t = _clean_text(v, 120)
        if not t:
            raise ValueError("Nombre vacío tras sanitizar")
        return t


class ProjectOut(BaseModel):
    id: uuid.UUID
    name: str
    created_at: datetime

    model_config = {"from_attributes": True}


class TargetCreate(BaseModel):
    project_id: uuid.UUID
    url: str = Field(min_length=1, max_length=2048)
    # Mínimo 3 para evitar "x"/"ok" como falso consentimiento.
    # Fase 4 real: checkbox + evidencia (quién/cuándo/qué dominio).
    consent_by: str = Field(min_length=3, max_length=254)

    @field_validator("consent_by")
    @classmethod
    def _sanitize_consent(cls, v: str) -> str:
        t = _clean_text(v, 254)
        if len(t) < 3:
            raise ValueError("Consentimiento insuficiente tras sanitizar")
        return t


class TargetOut(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    host: str
    consent_by: str
    created_at: datetime

    model_config = {"from_attributes": True}


class ScanCreate(BaseModel):
    target_id: uuid.UUID
    profile: str = Field(default="passive-python", max_length=64)

    @field_validator("profile")
    @classmethod
    def _sanitize_profile(cls, v: str) -> str:
        return _clean_text(v, 64) or "passive-python"


class ScanOut(BaseModel):
    id: uuid.UUID
    target_id: uuid.UUID
    status: str
    profile: str
    origin: str
    created_at: datetime

    model_config = {"from_attributes": True}


class FindingOut(BaseModel):
    id: uuid.UUID
    key: str
    title: str
    severity: str
    technical: str
    business_impact: str
    remediation: str
    compliance: list
    status: str

    model_config = {"from_attributes": True}


class CompareOut(BaseModel):
    base_id: uuid.UUID
    other_id: uuid.UUID
    new: list[FindingOut]
    fixed: list[FindingOut]
    persisting: list[FindingOut]
