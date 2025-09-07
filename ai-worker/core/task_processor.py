import time
from typing import Dict, Any, Optional
from datetime import datetime, timezone

import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from models.models import MeetingData
from services.classification_service import classification_service
from core.database import db_client
from core.redis_client import redis_client


class TaskProcessor:
    """Handles the processing of classification tasks"""

    def __init__(self):
        self.classification_service = classification_service
        self.db_client = db_client
        self.redis_client = redis_client

    def process_task(self, task_data: Dict[str, Any]) -> bool:
        try:
            task_id = task_data.get('id')
            task_name = task_data.get('task')
            args = task_data.get('args', [])

            print(f"🔄 Processing task {task_id}: {task_name}")

            if not task_id or not task_name:
                print(f"⚠️ Skipping invalid task: id={task_id}, task={task_name}")
                return False

            if task_name == 'classify_meeting' and len(args) >= 1:
                return self._process_classification_task(task_id, args)
            else:
                print(f"❓ Unknown task type: {task_name}")
                return False

        except Exception as e:
            print(f"💥 Error processing task {task_data.get('id')}: {str(e)}")
            self.redis_client.update_task_status(
                task_data.get('id', 'unknown'),
                'FAILURE',
                {'error': str(e)}
            )
            return False

    def _process_classification_task(self, task_id: str, args: list) -> bool:

        meeting_id = args[0]
        force_reprocess = args[1] if len(args) > 1 else False
        callback_url = args[2] if len(args) > 2 else None

        try:
            success = self.redis_client.update_task_status(
                task_id,
                'PROGRESS',
                {'message': 'Processing meeting classification...'}
            )
            if not success:
                print(f"⚠️ Failed to update task status for {task_id}")
                return False

            meeting_data = MeetingData(
                id=meeting_id,
                client_id=1,
                seller_id=1,
                meeting_at=datetime.now(timezone.utc).isoformat(),
                transcript=f"This is a dummy transcript for meeting {meeting_id}. The client showed interest in our product and we discussed pricing options.",
                closed=False,
                client_name=f"Client {meeting_id}",
                client_email=f"client{meeting_id}@example.com",
                seller_name="Sales Rep",
                seller_email="sales@vambe.com"
            )

            classification_result = self.classification_service.classify_meeting(meeting_data)

            classification_data = classification_result.model_dump()

            classification_data['meeting_id'] = meeting_id

            classification_data = self._convert_datetime_objects(classification_data)

            print(f"💾 Saving classification to database for meeting {meeting_id}")
            if not self.db_client.save_classification(classification_data):
                print(f"❌ Failed to save classification to database for meeting {meeting_id}")
                return False

            # Store results in Redis
            print(f"💾 Storing result in Redis for meeting {meeting_id}")
            if not self.redis_client.store_result(meeting_id, classification_data):
                print(f"❌ Failed to store result in Redis for meeting {meeting_id}")
                return False

            # Update task status to SUCCESS
            success = self.redis_client.update_task_status(
                task_id,
                'SUCCESS',
                {
                    'success': True,
                    'meeting_id': meeting_id,
                    'message': 'Classification completed successfully'
                }
            )
            if not success:
                print(f"⚠️ Failed to update final task status for {task_id}")
                return False

            print(f"Task {task_id} completed successfully")
            return True

        except Exception as e:
            print(f"💥 Error processing classification task {task_id}: {str(e)}")
            # Update task status to FAILURE
            self.redis_client.update_task_status(
                task_id,
                'FAILURE',
                {'error': str(e)}
            )
            return False

    def _convert_datetime_objects(self, obj):
        """
        Recursively convert datetime objects to ISO strings

        Args:
            obj: Object to convert

        Returns:
            Object with datetime objects converted to strings
        """
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, dict):
            return {k: self._convert_datetime_objects(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [self._convert_datetime_objects(item) for item in obj]
        else:
            return obj


# Singleton instance
task_processor = TaskProcessor()
