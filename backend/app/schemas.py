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
