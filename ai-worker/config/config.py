import os
from typing import Optional

class Config:
    """Configuration class for the AI worker service"""
    
    # Redis Configuration
    REDIS_URL: str = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
    
    # Database Configuration
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'postgresql://postgres:password@localhost:5432/vambe_db')
    
    # Celery Configuration
    CELERY_BROKER_URL: str = os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0')
    CELERY_RESULT_BACKEND: str = os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
    
    # API Configuration
    API_BASE_URL: str = os.getenv('API_BASE_URL', 'http://localhost:3000')
    
    # OpenAI Configuration (for future use)
    OPENAI_API_KEY: Optional[str] = os.getenv('OPENAI_API_KEY')
    OPENAI_MODEL: str = os.getenv('OPENAI_MODEL', 'gpt-4')
    
    # Worker Configuration
    WORKER_CONCURRENCY: int = int(os.getenv('WORKER_CONCURRENCY', '2'))
    TASK_TIMEOUT: int = int(os.getenv('TASK_TIMEOUT', '300'))  # 5 minutes
    
    @classmethod
    def get_celery_config(cls) -> dict:
        """Get Celery configuration dictionary"""
        return {
            'broker_url': cls.CELERY_BROKER_URL,
            'result_backend': cls.CELERY_RESULT_BACKEND,
            'task_serializer': 'json',
            'accept_content': ['json'],
            'result_serializer': 'json',
            'timezone': 'UTC',
            'enable_utc': True,
            'task_track_started': True,
            'task_time_limit': cls.TASK_TIMEOUT,
            'task_soft_time_limit': cls.TASK_TIMEOUT - 60,
            'worker_prefetch_multiplier': 1,
            'worker_max_tasks_per_child': 50,
        }
