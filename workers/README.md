# Vambe AI Worker

AI-powered meeting classification service using Celery and Redis.

## Overview

This worker service processes meeting transcripts and classifies them using AI. It's built with:

- **Python 3.11**
- **Celery** for distributed task processing
- **PostgreSQL** for data storage and retrieval
- **SQLAlchemy** for database operations
- **Pydantic** for data validation

> **Note**: This worker is managed entirely through the main Node.js API. There's no separate FastAPI - all worker management is done via `/api/workers` endpoints. The worker uses dummy data and stores results in Redis.

## Features

### Current (Dummy Implementation)
- ✅ Meeting classification with dummy logic
- ✅ Celery task processing (real Redis queues)
- ✅ Redis result storage
- ✅ Health checks
- ✅ Task monitoring via main API
- ✅ Batch processing
- ✅ Pure worker architecture (no database dependencies)

### Future (OpenAI Integration)
- 🔄 OpenAI GPT integration
- 🔄 Advanced prompt engineering
- 🔄 Custom classification models
- 🔄 Real-time processing

## Architecture

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   Main API      │    │    Redis     │    │   AI Worker     │
│  (Node.js)      │───▶│   (Broker)   │───▶│   (Python)      │
│  Port 3000      │    └──────────────┘    │  Celery + DB    │
└─────────────────┘                        └─────────────────┘
         │                                           │
         │              ┌──────────────┐            │
         └─────────────▶│ PostgreSQL   │◀───────────┘
                        │ (Database)   │
                        └──────────────┘
```

## Services

### AI Worker
- Processes classification tasks only
- Runs Celery worker processes
- Connects to main API for data
- **No separate API** - managed via main API

## API Endpoints

### Worker Management (Via Main API - Port 3000)

- `POST /api/workers/classify/{meetingId}` - Queue meeting classification
- `POST /api/workers/classify/batch` - Batch classification
- `GET /api/workers/task/{taskId}` - Get task status
- `GET /api/workers/stats` - Worker statistics
- `GET /api/workers/health` - Worker health check
- `POST /api/workers/cleanup` - Clean old tasks

## Classification Categories

The dummy classifier supports these categories:

- `sales_qualified` - High-potential sales lead
- `needs_follow_up` - Requires follow-up action
- `not_interested` - Customer not interested
- `pricing_discussion` - Pricing-related conversation
- `technical_questions` - Technical inquiry
- `competitor_mention` - Competitor mentioned
- `decision_maker_absent` - Decision maker not present
- `budget_constraints` - Budget-related concerns
- `timeline_discussion` - Timeline-related topics
- `closed_won` - Deal closed successfully
- `closed_lost` - Deal lost

## Usage

### Start Services
```bash
# From project root
docker-compose up ai-worker redis api
```

### Queue Classification Task
```bash
curl -X POST "http://localhost:3000/api/workers/classify/1" \
  -H "Content-Type: application/json" \
  -d '{"force_reprocess": false}'
```

### Check Task Status
```bash
curl "http://localhost:3000/api/workers/task/{task_id}"
```

### Batch Process
```bash
curl -X POST "http://localhost:3000/api/workers/classify/batch" \
  -H "Content-Type: application/json" \
  -d '{"meeting_ids": [1, 2, 3], "force_reprocess": false}'
```

### Worker Health Check
```bash
curl "http://localhost:3000/api/workers/health"
```

### Worker Statistics
```bash
curl "http://localhost:3000/api/workers/stats"
```

## Development

### Local Setup
```bash
cd ai-worker
pip install -r requirements.txt

# Start Redis locally
redis-server

# Start worker
celery -A worker.celery_app worker --loglevel=info

# Worker only runs in background - no separate API needed
```

### Environment Variables
```bash
REDIS_URL=redis://localhost:6379/0
DATABASE_URL=postgresql://user:pass@localhost:5432/db
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
API_BASE_URL=http://localhost:3000
```

## Monitoring

### Celery Flower (Optional)
```bash
pip install flower
celery -A worker.celery_app flower
# Access at http://localhost:5555
```

### Redis CLI
```bash
redis-cli
> KEYS *
> LLEN celery
```

## Next Steps

1. Replace dummy classifier with OpenAI integration
2. Add more sophisticated prompt engineering
3. Implement result storage in PostgreSQL
4. Add metrics and logging
5. Create classification result endpoints in main API
