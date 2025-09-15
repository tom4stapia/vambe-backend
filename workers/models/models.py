from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field
from datetime import datetime, timezone
from enum import Enum


class MeetingData(BaseModel):   
    id: int
    client_id: int
    seller_id: int
    meeting_at: datetime
    transcript: Optional[str] = None
    closed: bool = False
    
    client_name: Optional[str] = None
    client_email: Optional[str] = None
    seller_name: Optional[str] = None
    seller_email: Optional[str] = None

class ClassificationResult(BaseModel):
    business_sector: Optional[str] = None
    company_size: Optional[str] = None
    region: Optional[str] = None
    lead_source: Optional[str] = None
    vambe_product: Optional[str] = None
    use_case: Optional[str] = None
    primary_pain_point: Optional[str] = None
    urgency: Optional[bool] = None
    decision_maker_role: Optional[str] = None
    purchase_stage: Optional[str] = None
    language: Optional[str] = None
    lost_client_bad_meeting: Optional[bool] = None
    
    confidence_score: float = Field(ge=0.0, le=1.0, description="Confidence score between 0 and 1")
    sentiment: str = Field(description="Overall sentiment: positive, neutral, negative")
    key_topics: List[str] = Field(default_factory=list, description="Key topics discussed")
    action_items: List[str] = Field(default_factory=list, description="Identified action items")
    next_steps: Optional[str] = None
    summary: Optional[str] = None
    
    processed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    processing_time_ms: Optional[int] = None
    model_used: Optional[str] = None

class TaskResult(BaseModel):
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    task_id: Optional[str] = None
    processing_time_ms: Optional[int] = None

class ClassificationTask(BaseModel):
    meeting_id: int
    force_reprocess: bool = False
    callback_url: Optional[str] = None
    
class APIResponse(BaseModel):
    success: bool
    data: Optional[Dict[str, Any]] = None
    message: Optional[str] = None
    error: Optional[str] = None
