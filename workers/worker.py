"""
Celery worker entry point
"""
import os
import sys
import time
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import app
from core.redis_client import redis_client
from core.database import db_client


def main():
    """
    Start Celery worker with minimal initialization
    """
    print("🚀 Vambe AI Celery Worker starting...")
    print("📦 Initializing modular components...")

    if not redis_client.test_connection():
        print("❌ Redis connection failed. Exiting...")
        return 1

    print("✅ Redis connection established successfully")
    print("👂 Starting Celery worker...")
    print("💡 Database connections will be established when processing tasks")
    print("💡 Worker will automatically handle task distribution and scaling")
    
    app.worker_main([
        'worker',
        '--loglevel=info',
        '--concurrency=2',
        '--queues=vambe_tasks,celery,classification,default',
        '--hostname=worker@%h'
    ])


if __name__ == '__main__':
    main()
