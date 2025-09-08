import os
import sys
from celery import Celery
from dotenv import load_dotenv

load_dotenv()

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from config.config import Config

app = Celery('vambe_ai_worker')

app.config_from_object(Config.get_celery_config())

app.autodiscover_tasks(['core.tasks'])

app.conf.update(
    task_routes={
        'core.tasks.classify_meeting_task': {'queue': 'classification'},
        'core.tasks.*': {'queue': 'default'},
    },
    
    task_acks_late=True,
    worker_prefetch_multiplier=1,
    
    result_expires=3600, 
)

if __name__ == '__main__':
    app.start()
