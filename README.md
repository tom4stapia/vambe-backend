# Vambe AI Backend

Sistema completo de backend para gestión de meetings con clasificación automática por IA usando workers distribuidos.

## 🏗️ Arquitectura

```
┌─────────────┐    ┌──────────────┐    ┌─────────────┐
│   API REST  │    │    REDIS     │    │   WORKER    │
│  (Node.js)  │───▶│ (Broker + DB)│───▶│  (Python)   │
│  Port 3000  │    └──────────────┘    │  Celery     │
└─────────────┘                        └─────────────┘
       ▲                                           │
       │              ┌─────────────┐              │
       └─────────────▶│ PostgreSQL  │◀─────────────┘
                      │ (Database)  │
                      └─────────────┘
```

## 🚀 Inicio Rápido

### 1. Levantar Servicios
```bash
docker-compose up --build
```

### 2. Ejecutar Migraciones
```bash
npm run db:migrate
```

### 3. Poblar Base de Datos (Clasificación Automática)
```bash
npm run db:seed
```

### 4. Verificar Funcionamiento
```bash
# Health check
curl http://localhost:3000/health

# Ver clasificaciones
curl http://localhost:3000/api/workers/results
```

## 📚 API Endpoints

### Meetings
- `GET /api/meetings` - Listar meetings
- `GET /api/meetings/:id` - Obtener meeting específico
- `POST /api/meetings` - Crear meeting
- `PUT /api/meetings/:id` - Actualizar meeting
- `DELETE /api/meetings/:id` - Eliminar meeting

### Workers (Clasificación IA)
- `POST /api/workers/classify/:meetingId` - Clasificar meeting
- `POST /api/workers/classify/batch` - Clasificar múltiples meetings
- `GET /api/workers/task/:taskId` - Estado de tarea
- `GET /api/workers/results/:meetingId` - Resultado de clasificación
- `GET /api/workers/results` - Todos los resultados
- `GET /api/workers/stats` - Estadísticas del sistema
- `GET /api/workers/health` - Health check del worker
- `DELETE /api/workers/results/:meetingId` - Eliminar resultado

## 🔧 Tecnologías

### Backend API (Node.js)
- **Express.js** - Framework web
- **TypeScript** - Tipado estático
- **Sequelize** - ORM para PostgreSQL
- **Redis/ioredis** - Cliente Redis para workers
- **JWT** - Autenticación

### Worker AI (Python)
- **Celery** - Tareas distribuidas
- **Redis** - Message broker y almacenamiento
- **Pydantic** - Validación de datos
- **Python-dotenv** - Variables de entorno

### Base de Datos
- **PostgreSQL** - Base de datos principal
- **Redis** - Cache y colas de mensajes

## 📊 Flujo de Clasificación

1. **Seed automático**: Al poblar BD, automáticamente encola clasificaciones
2. **Worker procesa**: Celery workers procesan tareas desde Redis
3. **Resultados almacenados**: Clasificaciones guardadas en Redis
4. **API consulta**: La API principal lee resultados desde Redis

## 🧪 Testing

### Ejecutar Tests
```bash
npm test
```

### Health Checks
```bash
# API health
curl http://localhost:3000/health

# Worker health
curl http://localhost:3000/api/workers/health

# Database health
curl http://localhost:3000/api/health/db
```

## 📁 Estructura del Proyecto

```
vambe-ai-backend/
├── api/                          # API principal (Node.js)
│   ├── src/
│   │   ├── controllers/          # Controladores API
│   │   ├── services/             # Servicios de negocio
│   │   ├── routes/               # Definición de rutas
│   │   ├── db/                   # Configuración BD
│   │   │   ├── models/           # Modelos Sequelize
│   │   │   ├── migrations/       # Migraciones BD
│   │   │   └── seeders/          # Seeds de datos
│   │   └── types/                # Tipos TypeScript
│   ├── Dockerfile
│   └── package.json
├── ai-worker/                    # Worker de IA (Python)
│   ├── tasks/                    # Tareas Celery
│   ├── models.py                 # Modelos Pydantic
│   ├── classification_service.py # Servicio de clasificación
│   ├── celery_app.py             # Configuración Celery
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml            # Orquestación de servicios
└── README.md
```

## 🔒 Variables de Entorno

### API (.env)
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=vambe_db
DB_USER=postgres
DB_PASSWORD=password
REDIS_URL=redis://localhost:6379/0
JWT_SECRET=your-secret-key
```

### Worker (.env)
```env
REDIS_URL=redis://redis:6379/0
CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0
```

## 🚦 Estados del Sistema

- 🟢 **Verde**: Todos los servicios funcionando
- 🟡 **Amarillo**: Algunos servicios con problemas menores
- 🔴 **Rojo**: Servicios críticos caídos

## 📈 Monitoreo

- **Logs**: Cada servicio genera logs detallados
- **Health Checks**: Endpoints dedicados para monitoreo
- **Métricas**: Estadísticas de rendimiento disponibles
- **Alertas**: Sistema de notificaciones para problemas

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
Repositorio para prueba técnica Vambe AI
