"""
Celery tasks for AI worker processing
"""

import os
import sys
import time
from typing import Dict, Any, Optional
from datetime import datetime, timezone

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app
from models.models import MeetingData
from services.classification_service import classification_service
from core.database import db_client
from core.redis_client import redis_client


@app.task(bind=True, name="classify_meeting")
def classify_meeting_task(
    self,
    meeting_id: int,
    force_reprocess: bool = False,
    callback_url: Optional[str] = None,
) -> Dict[str, Any]:
    task_id = self.request.id

    try:
        self.update_state(
            state="PROGRESS",
            meta={
                "message": "Processing meeting classification...",
                "meeting_id": meeting_id,
            },
        )

        meeting_data_dict = db_client.get_meeting(meeting_id)

        if not meeting_data_dict:
            raise Exception(f"Meeting {meeting_id} not found in database")

        meeting_data = MeetingData(
            id=meeting_data_dict["id"],
            client_id=meeting_data_dict["client_id"],
            seller_id=meeting_data_dict["seller_id"],
            meeting_at=meeting_data_dict["meeting_at"],
            transcript=meeting_data_dict.get("transcript"),
            closed=meeting_data_dict.get("closed", False),
            client_name=meeting_data_dict.get("client_name"),
            client_email=meeting_data_dict.get("client_email"),
            seller_name=meeting_data_dict.get("seller_name"),
            seller_email=meeting_data_dict.get("seller_email"),
        )

        classification_result = classification_service.classify_meeting(meeting_data)
        classification_data = classification_result.model_dump()
        classification_data["meeting_id"] = meeting_id

        classification_data = _convert_datetime_objects(classification_data)

        if not db_client.save_classification(classification_data):
            raise Exception(
                f"Failed to save classification to database for meeting {meeting_id}"
            )

        if not redis_client.store_result(meeting_id, classification_data):
            raise Exception(f"Failed to store result in Redis for meeting {meeting_id}")

        result = {
            "success": True,
            "meeting_id": meeting_id,
            "classification_data": classification_data,
            "message": "Classification completed successfully",
        }

        self.update_state(state="SUCCESS", meta=result)

        return result

    except Exception as e:
        error_msg = f"Error processing classification task {task_id}: {str(e)}"

        self.update_state(
            state="FAILURE", meta={"error": str(e), "meeting_id": meeting_id}
        )

        print(f"💥 {error_msg}")

        raise self.retry(exc=e, countdown=60, max_retries=3)


@app.task(name="health_check")
def health_check_task() -> Dict[str, Any]:
    """
    Health check task to verify worker functionality

    Returns:
        Dict containing health status
    """
    try:
        redis_healthy = redis_client.test_connection()

        db_healthy = False
        try:
            db_healthy = db_client.test_connection()
        except Exception as db_error:
            print(f"⚠️ Database health check failed: {str(db_error)}")

        return {
            "status": "healthy" if redis_healthy else "unhealthy",
            "database": "connected" if db_healthy else "disconnected",
            "redis": "connected" if redis_healthy else "disconnected",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }

    except Exception as e:
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }


def _convert_datetime_objects(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    elif isinstance(obj, dict):
        return {k: _convert_datetime_objects(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [_convert_datetime_objects(item) for item in obj]
    else:
        return obj
