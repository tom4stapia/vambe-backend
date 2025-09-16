# Vambe AI Backend

Sistema completo de backend para gestión de meetings con clasificación automática por IA usando workers distribuidos.

## 🏗️ Arquitectura

### Visión General

El sistema está construido con una arquitectura de microservicios que combina una API REST en Node.js con workers de procesamiento de IA en Python, utilizando Redis como broker de mensajes y PostgreSQL como base de datos principal.

```
┌─────────────────┐    ┌──────────────┐    ┌─────────────────┐
│   API REST      │    │    REDIS     │    │   AI WORKER     │
│  (NestJS)       │───▶│ (Broker + DB)│───▶│  (Python)       │
│  Port 3000      │    └──────────────┘    │  Celery         │
└─────────────────┘                        └─────────────────┘
       ▲                                           │
       │              ┌──────────────┐             │
       └─────────────▶│ PostgreSQL   │◀───────────-┘
                      │ (Database)   │
                      └──────────────┘
```

### Decisiones Arquitectónicas Clave

#### 1. **Separación de Responsabilidades**

- **API REST (NestJS)**: Maneja la lógica de negocio, autenticación, y endpoints
- **Workers (Python)**: Procesa tareas de IA de forma asíncrona
- **Redis**: Broker de mensajes y cache de resultados
- **PostgreSQL**: Almacenamiento persistente de datos

#### 2. **Procesamiento Asíncrono**

- Las tareas de clasificación de IA se procesan de forma asíncrona usando Celery
- Los resultados se almacenan en Redis para acceso rápido
- La API puede consultar el estado de las tareas en tiempo real

#### 3. **Escalabilidad**

- Los workers pueden escalarse horizontalmente
- Redis permite distribución de carga
- PostgreSQL maneja grandes volúmenes de datos de forma eficiente

## 🚀 Instalación y Configuración Local

### Prerrequisitos

- Docker y Docker Compose
- Node.js 18+ (para desarrollo local)
- Python 3.11+ (para desarrollo local)
- Git

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/vambe-ai-backend.git
cd vambe-ai-backend
```

### 2. Configurar Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=development
PORT=3000

POSTGRES_DB=db_name
POSTGRES_USER=db_user
POSTGRES_PASSWORD=db_pswd
POSTGRES_HOST=db_host
POSTGRES_PORT=5432

REDIS_URL=redis://redis:6379/0

OPENAI_API_KEY=sk-proj-...
OPENAI_MODEL=gpt-4o-mini

CELERY_BROKER_URL=redis://redis:6379/0
CELERY_RESULT_BACKEND=redis://redis:6379/0

QUEUE_NAME=string
WORKER_CONCURRENCY=number
TASK_TIMEOUT=number
MAX_RETRIES=number

SUPER_ADMIN_EMAIL=string
SUPER_ADMIN_PASSWORD=string
SUPER_ADMIN_NAME=string

CORS_ORIGIN=*
JWT_SECRET=string
```

### 3. Levantar Servicios con Docker

```bash
# Construir y levantar todos los servicios
docker compose up --build

# O en modo detached
docker compose up --build -d
```

### 4. Verificar Funcionamiento

```bash
# Health check de la API
curl http://localhost:3000/health

# Health check de workers
curl http://localhost:3000/api/v1/workers/health

# Ver estadísticas del sistema
curl http://localhost:3000/api/v1/workers/stats
```

## 🛠️ Desarrollo Local (Sin Docker)

### API (NestJS)

```bash
cd api
npm install
npm run start:dev
```

### Workers (Python)

```bash
cd workers
pip install -r requirements.txt
python worker.py
```

### Servicios de Base de Datos

```bash
# PostgreSQL
docker run -d --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15-alpine

# Redis
docker run -d --name redis -p 6379:6379 redis:6-alpine
```

## 📚 API Endpoints

### Autenticación

- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/register` - Registro de usuario
- `GET /api/v1/auth/profile` - Obtener perfil del usuario
- `POST /api/v1/auth/refresh` - Renovar token

### Clientes

- `GET /api/v1/clients` - Listar clientes (con paginación)
- `GET /api/v1/clients/:id` - Obtener cliente por ID
- `POST /api/v1/clients` - Crear cliente
- `PATCH /api/v1/clients/:id` - Actualizar cliente
- `DELETE /api/v1/clients/:id` - Eliminar cliente

### Vendedores

- `GET /api/v1/sellers` - Listar vendedores (con paginación)
- `GET /api/v1/sellers/:id` - Obtener vendedor por ID
- `POST /api/v1/sellers` - Crear vendedor
- `PUT /api/v1/sellers/:id` - Actualizar vendedor
- `DELETE /api/v1/sellers/:id` - Eliminar vendedor
- `GET /api/v1/sellers/active` - Listar vendedores activos

### Reuniones

- `GET /api/v1/meetings` - Listar reuniones (con paginación)
- `GET /api/v1/meetings/:id` - Obtener reunión por ID
- `POST /api/v1/meetings` - Crear reunión
- `PATCH /api/v1/meetings/:id` - Actualizar reunión
- `DELETE /api/v1/meetings/:id` - Eliminar reunión
- `PATCH /api/v1/meetings/:id/close` - Cerrar reunión

### Workers (Clasificación IA)

- `POST /api/v1/workers/classify/:meetingId` - Clasificar meeting individual
- `POST /api/v1/workers/classify/batch` - Clasificar múltiples meetings
- `GET /api/v1/workers/task/:taskId` - Estado de tarea específica
- `GET /api/v1/workers/stats` - Estadísticas del sistema de workers
- `GET /api/v1/workers/health` - Health check del worker
- `GET /api/v1/workers/classification/:meetingId` - Resultado de clasificación
- `GET /api/v1/workers/classifications` - Todos los resultados
- `DELETE /api/v1/workers/classification/:meetingId` - Eliminar resultado

### Clasificaciones

- `GET /api/v1/classifications` - Listar clasificaciones
- `GET /api/v1/classifications/:meetingId` - Obtener clasificación por meeting
- `POST /api/v1/classifications/queue-unclassified` - Encolar meetings sin clasificar

### KPIs y Analytics

- `GET /api/v1/kpis` - KPIs generales
- `GET /api/v1/kpis/overview` - Resumen ejecutivo
- `GET /api/v1/kpis/sellers/performance` - Rendimiento de vendedores
- `GET /api/v1/kpis/meetings/trends` - Tendencias de meetings
- `GET /api/v1/kpis/clients/engagement` - Engagement de clientes
- `GET /api/v1/kpis/clients/analysis` - Análisis de clientes

### Seeds y Utilidades

- `POST /api/v1/seeds/populate` - Poblar base de datos con datos de prueba

### Health Checks

- `GET /health` - Health check general del sistema

## 🔧 Tecnologías

### Backend API (Node.js/NestJS)

- **NestJS** - Framework progresivo de Node.js
- **TypeScript** - Tipado estático
- **Sequelize** - ORM para PostgreSQL
- **Redis/ioredis** - Cliente Redis para workers
- **JWT** - Autenticación basada en tokens
- **Class-validator** - Validación de DTOs
- **Passport** - Estrategias de autenticación

### Worker AI (Python)

- **Celery** - Tareas distribuidas asíncronas
- **Redis** - Message broker y almacenamiento de resultados
- **Pydantic** - Validación de datos
- **SQLAlchemy** - ORM para Python
- **OpenAI** - Integración con GPT para clasificación
- **Psycopg2** - Driver PostgreSQL para Python

### Base de Datos y Cache

- **PostgreSQL 15** - Base de datos principal
- **Redis 6** - Cache y colas de mensajes

### DevOps y Deployment

- **Docker** - Containerización
- **Docker Compose** - Orquestación de servicios
- **GitHub Actions** - CI/CD pipeline

## 📊 Flujo de Clasificación de IA

### 1. **Inicio Automático con Seeds**

El proceso de clasificación se inicia automáticamente al levantar el backend con `docker-compose up --build`. Las migraciones y seeds se ejecutan automáticamente durante el startup.

### 2. **Procesamiento Asíncrono**

- Los meetings se encolan automáticamente en Redis al poblar la base de datos
- El worker Python procesa las clasificaciones usando OpenAI GPT-4o-mini
- Los resultados se almacenan en Redis para acceso rápido

### 3. **Consulta de Resultados**

```bash
# Verificar estado de una tarea específica
curl "http://localhost:3000/api/v1/workers/task/{task_id}"

# Obtener resultado de clasificación por meeting
curl "http://localhost:3000/api/v1/workers/classification/1"

# Ver todas las clasificaciones
curl "http://localhost:3000/api/v1/workers/classifications"

# Estadísticas del sistema
curl "http://localhost:3000/api/v1/workers/stats"
```

### 4. **Categorías de Clasificación**

#### **Información del Negocio**

- **business_sector**: retail, ecommerce, financial_services, insurance, healthcare, pharmaceuticals, energy, utilities, telecom, transportation_logistics, tourism_hospitality, education, government, agroindustry, manufacturing, construction, mining, media_entertainment, software_saas, real_estate, food_beverages, cpg, automotive, ngo, human_resources
- **company_size**: small, medium, large, enterprise
- **region**: latam_south, latam_north, north_america, europe, asia, africa, oceania

#### **Origen y Producto**

- **lead_source**: referral, seo, sem_ads, email, event, partner, outbound_call, cold_email, linkedin, instagram, facebook, webchat, pr, marketplace
- **vambe_product**: mercur (chats+integrations), iris (fast/simple), ads (attribution/marketing), axis (only integrations)

#### **Análisis de la Oportunidad**

- **use_case**: lead_scoring, customer_segmentation, churn_prediction, marketing_attribution, campaign_optimization, demand_forecasting, voice_analytics, operations_automation, real_time_reporting, dw_modernization, fraud_detection, conversational_support
- **primary_pain_point**: lack_visibility, slow_reporting, low_conversion, high_churn, high_advertising_costs, difficult_integrations, regulatory_compliance, dispersed_data, saturated_support, scalability

#### **Contexto de la Reunión**

- **urgency**: true/false (basado en deadlines o presión temporal)
- **decision_maker_role**: ceo, coo, cto, cmo, cio, cfo, head_data, head_ops, head_sales, product_owner, it_manager, analyst, founder
- **purchase_stage**: discovery, negotiation, closure
- **language**: es, en
- **lost_client_bad_meeting**: true/false (basado en confusión o insatisfacción)

#### **Análisis de Contenido**

- **sentiment**: positive, neutral, negative
- **confidence_score**: 0.1 - 0.95
- **key_topics**: Lista de 2-5 temas específicos en español
- **action_items**: Lista de 1-3 acciones específicas en español
- **next_steps**: Descripción concisa del siguiente paso acordado
- **summary**: Resumen de 1-2 oraciones en español

## Health Checks

```bash
# API health
curl http://localhost:3000/health

# Worker health
curl http://localhost:3000/api/v1/workers/health

```

### Estadísticas del Sistema

```bash
# Ver estadísticas de workers
curl http://localhost:3000/api/v1/workers/stats
```

### Logs y Debugging

```bash
# Ver logs de la API
docker logs vambe-api

# Ver logs de workers
docker logs vambe-workers

# Ver logs de Redis
docker logs vambe-redis

# Ver logs de PostgreSQL
docker logs vambe-db
```

## 📁 Estructura del Proyecto

```
vambe-ai-backend/
├── api/                          # API principal (NestJS)
│   ├── src/
│   │   ├── modules/              # Módulos de la aplicación
│   │   │   ├── auth/            # Autenticación y autorización
│   │   │   ├── clients/         # Gestión de clientes
│   │   │   ├── sellers/         # Gestión de vendedores
│   │   │   ├── meetings/        # Gestión de reuniones
│   │   │   ├── workers/         # Integración con workers
│   │   │   ├── classifications/ # Clasificaciones
│   │   │   ├── kpis/           # KPIs y analytics
│   │   │   ├── seeds/          # Seeds de datos
│   │   │   └── health/         # Health checks
│   │   ├── database/            # Configuración de base de datos
│   │   │   ├── models/         # Modelos Sequelize
│   │   │   ├── migrations/     # Migraciones de BD
│   │   │   └── seeds/          # Seeds de datos
│   │   ├── common/             # Utilidades comunes
│   │   │   ├── decorators/     # Decoradores personalizados
│   │   │   ├── dto/           # Data Transfer Objects
│   │   │   ├── filters/       # Filtros de excepciones
│   │   │   ├── guards/        # Guards de autenticación
│   │   │   ├── middleware/    # Middleware personalizado
│   │   │   └── strategies/    # Estrategias de autenticación
│   │   ├── config/            # Configuraciones
│   │   └── types/             # Tipos TypeScript
│   ├── Dockerfile
│   └── package.json
├── workers/                     # Worker de IA (Python)
│   ├── core/                   # Configuración core
│   ├── models/                 # Modelos de datos
│   ├── services/               # Servicios de IA
│   ├── enums/                  # Enumeraciones
│   ├── config/                 # Configuraciones
│   ├── worker.py              # Punto de entrada del worker
│   ├── app.py                 # Configuración de la app
│   ├── Dockerfile
│   └── requirements.txt
├── docker-compose.yml          # Orquestación de servicios
├── .github/workflows/          # CI/CD pipeline
└── README.md
```

## 🚀 Deployment

### GitHub Actions CI/CD

El proyecto incluye un pipeline automatizado que:

1. Se ejecuta en push a `main`
2. Crea el archivo `.env` desde secrets
3. Detiene contenedores existentes
4. Construye y levanta nuevos contenedores

### Comandos de Deployment

```bash
# Deploy manual
docker-compose down
docker-compose up --build -d

# Verificar deployment
curl https://eaznxkzdji.execute-api.us-east-2.amazonaws.com/health
```

## 🔒 Seguridad

### Autenticación

- JWT tokens con expiración
- Refresh tokens para renovación
- Guards de autenticación en endpoints protegidos

### Validación

- Validación de DTOs con class-validator
- Sanitización de inputs
- Rate limiting (configurable)

### Variables de Entorno

- Secrets almacenados en GitHub Secrets
- Variables sensibles no expuestas en código
- Configuración separada por ambiente

## 📈 Monitoreo y Logs

### Health Checks

- Endpoint `/health` para monitoreo general
- Health checks específicos por servicio
- Métricas de rendimiento disponibles

### Logging

- Logs estructurados con niveles
- Request logging middleware
- Error tracking y reporting

### Métricas

- Estadísticas de workers en tiempo real
- KPIs de rendimiento del sistema
- Monitoreo de colas de Redis

## 🚀 Mejoras Futuras

### Autenticación y Seguridad

- **Auth0 Integration**: Implementar Auth0 o similar para manejo robusto de autenticación
- **OAuth 2.0**: Agregar soporte para múltiples proveedores de identidad
- **Rate Limiting**: Implementar rate limiting más sofisticado
- **API Keys**: Sistema de API keys para integraciones externas

### Clasificación de IA

- **Modelos Avanzados**: Migrar a Claude o mejores modelos para mejor precisión
- **Fine-tuning**: Entrenar modelos específicos para el dominio de Vambe
- **Validación de Resultados**: Sistema de feedback para mejorar clasificaciones
- **Batch Processing**: Optimizar procesamiento en lotes para mayor eficiencia

### Arquitectura y Performance

- **Serverless**: Migrar de EC2 a AWS Lambda para mejor escalabilidad
- **ElastiCache**: Implementar AWS ElastiCache for Redis para mejor performance
- **API Gateway**: Optimizar configuración de API Gateway
- **CDN**: Implementar CloudFront para contenido estático
- **Database Optimization**: Optimizar queries y agregar índices

### Testing y Calidad

- **Unit Tests**: Cobertura completa de tests unitarios
- **Integration Tests**: Tests de integración end-to-end
- **Load Testing**: Tests de carga para validar performance
- **Monitoring**: Implementar CloudWatch, DataDog o similar
- **Error Tracking**: Sentry o similar para tracking de errores

### DevOps y Deployment

- **Infrastructure as Code**: Terraform o CloudFormation
- **Blue-Green Deployment**: Implementar deployments sin downtime
- **Auto-scaling**: Configurar auto-scaling basado en métricas
- **Backup Strategy**: Estrategia robusta de backups

## 🔗 Enlaces Importantes

- **Repositorio GitHub**: [https://github.com/tom4stapia/vambe-ai-backend](https://github.com/tu-usuario/vambe-ai-backend)
- **API en Producción**: [https://eaznxkzdji.execute-api.us-east-2.amazonaws.com](https://eaznxkzdji.execute-api.us-east-2.amazonaws.com)
- **Health Check**: [https://eaznxkzdji.execute-api.us-east-2.amazonaws.com/api/v1/health](https://eaznxkzdji.execute-api.us-east-2.amazonaws.com/api/v1/health)

---

**Vambe AI Backend** - Sistema de gestión de meetings con clasificación automática por IA
