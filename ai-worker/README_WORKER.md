# Vambe AI Worker - Arquitectura Modular con Celery

## 📁 Estructura Modular Organizada

```
ai-worker/
├── 📁 core/                   # 🏗️ Componentes principales
│   ├── database.py           # 🗄️ Cliente PostgreSQL con ORM
│   ├── database_config.py    # ⚙️ Configuración SQLAlchemy
│   ├── redis_client.py       # 🔴 Cliente Redis
│   ├── tasks.py              # 🎯 Tareas de Celery
│   └── __init__.py
├── 📁 services/              # 🔧 Servicios de negocio
│   ├── classification_service.py  # 🤖 Servicio de clasificación
│   └── __init__.py
├── 📁 models/                # 📋 Modelos de datos
│   ├── models.py             # Modelos Pydantic
│   ├── database_models.py    # Modelos SQLAlchemy ORM
│   └── __init__.py
├── 📁 config/                # ⚙️ Configuración
│   ├── config.py             # Configuración de la aplicación
│   └── __init__.py
├── app.py                    # 🌸 Aplicación Celery
├── worker.py                 # 🎯 Worker de Celery
├── __init__.py               # 📦 Paquete Python principal
├── requirements.txt          # 📋 Dependencias
├── Dockerfile               # 🐳 Docker
└── README_WORKER.md         # 📖 Esta documentación
```

## 🏗️ Arquitectura con Celery

### **1. Aplicación Celery (`app.py`)**
- **Responsabilidad**: Configuración y setup de Celery
- **Funciones**:
  - Configurar broker (Redis)
  - Configurar result backend
  - Auto-descubrir tareas
  - Configurar routing y colas

### **2. Tareas de Celery (`core/tasks.py`)**
- **Responsabilidad**: Definir tareas asíncronas
- **Funciones**:
  - `classify_meeting_task`: Procesar clasificación de reuniones
  - `health_check_task`: Verificar salud del sistema
  - Manejo de estados y reintentos
  - Integración con servicios modulares

### **3. Worker de Celery (`worker.py`)**
- **Responsabilidad**: Ejecutar worker de Celery
- **Funciones**:
  - Inicializar conexiones
  - Iniciar worker con configuración
  - Manejar concurrencia
  - Procesar colas específicas

### **4. Servicios Modulares**
- **Cliente Redis (`redis_client.py`)**: Comunicación con Redis
- **Cliente Base de Datos (`database.py`)**: Comunicación con PostgreSQL usando SQLAlchemy ORM
- **Configuración DB (`database_config.py`)**: Configuración y gestión de sesiones SQLAlchemy
- **Servicio de Clasificación (`classification_service.py`)**: Lógica de negocio

### **5. Modelos de Datos**
- **Modelos Pydantic (`models.py`)**: Validación y serialización de datos
- **Modelos SQLAlchemy (`database_models.py`)**: Mapeo ORM de la base de datos existente

## 🔄 Flujo de Trabajo con Celery

```mermaid
graph TD
    A[API/Client] --> B[Enqueue Task]
    B --> C[Redis Queue]
    C --> D[Celery Worker]
    D --> E[Execute Task]
    E --> F[Update Progress]
    F --> G[Process Classification]
    G --> H[Save to Database]
    H --> I[Store in Redis]
    I --> J[Update Result]
    J --> K[Task Complete]
```

## 🚀 Uso con Celery

### **Ejecución con Docker Compose (Recomendado)**
```bash
# Iniciar todos los servicios
docker compose up -d

# Ver logs del worker
docker compose logs -f ai-worker
```

### **Ejecución Manual**
```bash
cd ai-worker

# Iniciar worker de Celery
python worker.py
```

### **Comandos Celery Útiles**
```bash
# Ver workers activos
celery -A app inspect active

# Ver estadísticas
celery -A app inspect stats

# Enviar tarea de prueba
celery -A app call core.tasks.health_check_task

# Ver colas
celery -A app inspect active_queues
```


## 🧪 Pruebas

### **Prueba de Conexiones**
```bash
python -c "from core.redis_client import redis_client; redis_client.test_connection()"
python -c "from core.database import db_client; db_client.test_connection()"
```

## ⚙️ Configuración

### **Variables de Entorno**
```bash
# Redis
REDIS_URL=redis://redis:6379/0

# PostgreSQL
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=vambe_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
```

### **Dependencias**
```txt
psycopg2-binary==2.9.9
redis==5.0.1
pydantic==2.5.2
python-dotenv==1.0.0
celery==5.3.4
sqlalchemy==2.0.23
```

## 🛠️ Desarrollo

### **Agregar Nuevo Módulo**
1. **Decidir ubicación según responsabilidad:**
   - `core/` - Componentes principales (DB, Redis, procesadores)
   - `services/` - Servicios de negocio
   - `models/` - Modelos de datos
   - `config/` - Configuración

2. Crear archivo en carpeta correspondiente
3. Implementar clase principal
4. Crear instancia singleton
5. Actualizar `__init__.py` de la carpeta y el principal
6. Actualizar tests

### **Ejemplo de Nuevo Módulo**
```python
# new_module.py
class NewModule:
    def do_something(self):
        return "Hello from new module"

new_module = NewModule()
```

## 🔧 Mantenimiento

### **Logs y Debugging**
- Cada módulo incluye emojis para fácil identificación
- Mensajes detallados de error
- Estados de conexión verificados al inicio

### **Monitoreo**
```bash
# Ver logs en tiempo real
docker compose logs -f ai-worker

# Ejecutar pruebas específicas
docker compose exec ai-worker python -c "from core.database import db_client; db_client.test_connection()"
```

## 🎯 Beneficios de la Arquitectura Modular con Celery

### **Ventajas de Celery**
- **🚀 Escalabilidad**: Múltiples workers automáticamente
- **⚡ Concurrencia**: Procesamiento paralelo de tareas
- **🔄 Reintentos**: Manejo automático de fallos
- **📊 Monitoreo**: Logs detallados para supervisión
- **🎯 Distribución**: Tareas distribuidas entre workers
- **⏰ Programación**: Tareas programadas y periódicas

### **Ventajas de la Modularización**
- **🔧 Mantenibilidad**: Cada módulo tiene responsabilidad única
- **🧪 Testabilidad**: Componentes independientes fáciles de testear
- **🔄 Reutilización**: Módulos pueden usarse en otros proyectos
- **📈 Escalabilidad**: Fácil agregar nuevos módulos
- **🐛 Debugging**: Errores aislados por módulo
- **👥 Colaboración**: Equipos pueden trabajar en módulos separados

### **Migración Exitosa**
- **✅ Compatibilidad**: Servicios modulares existentes se mantienen
- **✅ Funcionalidad**: Misma lógica de negocio, mejor infraestructura
- **✅ Monitoreo**: Logs detallados proporcionan visibilidad completa
- **✅ Escalabilidad**: Fácil agregar más workers según demanda
- **✅ ORM**: SQLAlchemy para acceso robusto a la base de datos existente
- **✅ Consistencia**: Modelos ORM coinciden con la estructura de la API

### **Ventajas del ORM SQLAlchemy**
- **🔗 Relaciones**: Manejo automático de relaciones entre tablas
- **🛡️ Seguridad**: Protección contra SQL injection
- **🔄 Transacciones**: Manejo automático de transacciones
- **📊 Consultas**: API de consultas más intuitiva y mantenible
- **🎯 Tipado**: Mejor integración con sistemas de tipos de Python
- **🔧 Mantenimiento**: Código más limpio y fácil de mantener
