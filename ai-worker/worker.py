import os
import sys
import time
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from core.task_processor import task_processor
from core.redis_client import redis_client
from core.database import db_client


def main():
    """
    Main worker loop - orchestrates the modular components
    """
    print("🚀 Vambe AI Worker starting...")
    print("📦 Initializing modular components...")

    # Test connections
    if not redis_client.test_connection():
        print("❌ Redis connection failed. Exiting...")
        return 1

    if not db_client.test_connection():
        print("❌ Database connection failed. Exiting...")
        return 1

    print("✅ All connections established successfully")
    print("👂 Worker listening for tasks from Redis queue...")
    print("💡 Press Ctrl+C to stop the worker")

    try:
        while True:
            # Get next task from Redis queue
            task_data = redis_client.get_task()

            if task_data:
                # Process the task using our modular processor
                success = task_processor.process_task(task_data)
                if success:
                    print("✅ Task processed successfully")
                else:
                    print("❌ Task processing failed")
            else:
                # No task available, brief pause
                time.sleep(0.1)

    except KeyboardInterrupt:
        print("\n🛑 Worker shutdown requested by user")
    except Exception as e:
        print(f"💥 Critical worker error: {str(e)}")
        return 1

    print("👋 Worker shutdown complete")
    return 0


if __name__ == '__main__':
    exit_code = main()
    sys.exit(exit_code)
