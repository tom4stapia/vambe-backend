import redis
import json
import os
from typing import Dict, Any, Optional


class RedisQueueClient:

    def __init__(self):
        self.redis_url = os.getenv("REDIS_URL", "redis://redis:6379/0")
        self.redis_client = None

    def connect(self):
        try:
            self.redis_client = redis.from_url(self.redis_url)
            print("Redis connection established")
        except Exception as e:
            print(f"Failed to connect to Redis: {str(e)}")
            raise

    def get_task(self) -> Optional[Dict[str, Any]]:

        if not self.redis_client:
            self.connect()

        try:
            # Wait for task from Redis queue with 1 second timeout
            task_data_raw = self.redis_client.brpop("celery", 1)

            if task_data_raw:
                queue_name, task_message = task_data_raw
                try:
                    task_message_str = task_message.decode("utf-8")
                    task_data = json.loads(task_message_str)

                    # Validate task format
                    if isinstance(task_data, dict) and (
                        "id" in task_data or "task" in task_data
                    ):
                        return task_data
                    else:
                        print(f"Invalid task format, skipping: {task_data}")
                        return None

                except json.JSONDecodeError as e:
                    print(
                        f"Failed to parse task message: {e} - Message: {task_message[:100]}..."
                    )
                    return None
                except Exception as e:
                    print(f"Error parsing task message: {e}")
                    return None
            else:
                return None

        except Exception as e:
            print(f"Error getting task from Redis: {str(e)}")
            return None

    def store_result(self, meeting_id: int, result_data: Dict[str, Any]) -> bool:
        if not self.redis_client:
            self.connect()

        try:
            result_key = f"classification_result:{meeting_id}"
            self.redis_client.setex(result_key, 86400, json.dumps(result_data))
            print(f"Result stored in Redis for meeting {meeting_id}")
            return True
        except Exception as e:
            print(f"Error storing result in Redis: {str(e)}")
            return False

    def update_task_status(
        self, task_id: str, status: str, result: Optional[Dict[str, Any]] = None
    ) -> bool:
        if not self.redis_client:
            self.connect()

        try:
            # Update status
            self.redis_client.hset(f"celery-task-meta-{task_id}", "status", status)

            if status == "PROGRESS":
                self.redis_client.hset(f"celery-task-meta-{task_id}", "current", "0")
                self.redis_client.hset(f"celery-task-meta-{task_id}", "total", "100")
                if result:
                    self.redis_client.hset(
                        f"celery-task-meta-{task_id}", "result", json.dumps(result)
                    )

            elif status in ["SUCCESS", "FAILURE"]:
                if result:
                    self.redis_client.hset(
                        f"celery-task-meta-{task_id}", "result", json.dumps(result)
                    )

            return True
        except Exception as e:
            print(f"Error updating task status in Redis: {str(e)}")
            return False

    def test_connection(self) -> bool:
        try:
            if not self.redis_client:
                self.connect()
            self.redis_client.ping()
            print("Redis connection successful")
            return True
        except Exception as e:
            print(f"Redis connection failed: {str(e)}")
            return False


redis_client = RedisQueueClient()
