"""Schemas pydantic fase 2: projects + targets."""

from __future__ import annotations

import uuid
from datetime import datetime

from pydantic import BaseModel, Field


class ProjectCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)


class ProjectOut(BaseModel):
    id: uuid.UUID
    name: str
    created_at: datetime

    model_config = {"from_attributes": True}


class TargetCreate(BaseModel):
    project_id: uuid.UUID
    url: str = Field(min_length=1, max_length=2048)
    consent_by: str = Field(min_length=1, max_length=254)


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
