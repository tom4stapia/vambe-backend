from typing import Optional, Dict, Any, List
from pydantic import BaseModel, Field
from datetime import datetime, timezone
from enum import Enum

class ClassificationCategory(str, Enum):
    SALES_QUALIFIED = "sales_qualified"
    NEEDS_FOLLOW_UP = "needs_follow_up"
    NOT_INTERESTED = "not_interested"
    PRICING_DISCUSSION = "pricing_discussion"
    TECHNICAL_QUESTIONS = "technical_questions"
    COMPETITOR_MENTION = "competitor_mention"
    DECISION_MAKER_ABSENT = "decision_maker_absent"
    BUDGET_CONSTRAINTS = "budget_constraints"
    TIMELINE_DISCUSSION = "timeline_discussion"
    CLOSED_WON = "closed_won"
    CLOSED_LOST = "closed_lost"

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
    categories: List[ClassificationCategory] = Field(default_factory=list)
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
