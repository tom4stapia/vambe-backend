# Vambe API - NestJS Version

Esta es la versión migrada de la API de Vambe usando NestJS con Sequelize como ORM, manteniendo la estructura de microservicios.

## Características

- **Framework**: NestJS
- **ORM**: Sequelize con TypeScript
- **Base de datos**: PostgreSQL
- **Validación**: class-validator y class-transformer
- **Estructura**: Modular con separación de responsabilidades

## Estructura del Proyecto

```
src/
├── modules/           # Módulos de la aplicación
│   ├── clients/      # Gestión de clientes
│   ├── sellers/      # Gestión de vendedores
│   ├── meetings/     # Gestión de reuniones
│   └── workers/      # Integración con workers
├── database/         # Configuración de base de datos
│   ├── models/       # Modelos de Sequelize
│   ├── migrations/   # Migraciones de base de datos
│   └── seeders/      # Seeders de datos
├── common/           # Utilidades comunes
│   └── dto/          # Data Transfer Objects
├── types/            # Tipos TypeScript
└── config/           # Configuraciones
```

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus configuraciones
```

3. Ejecutar migraciones:
```bash
npm run db:migrate
```

4. (Opcional) Ejecutar seeders:
```bash
# Seeder con datos del CSV completo (62 registros)
npm run db:seed
```

## Scripts Disponibles

- `npm run start:dev` - Ejecutar en modo desarrollo
- `npm run build` - Compilar la aplicación
- `npm run start:prod` - Ejecutar en modo producción
- `npm run db:migrate` - Ejecutar migraciones
- `npm run db:seed` - Ejecutar seeders
- `npm run db:reset` - Resetear base de datos

## API Endpoints

### Clientes
- `GET /clients` - Listar clientes (con paginación)
- `GET /clients/:id` - Obtener cliente por ID
- `POST /clients` - Crear cliente
- `PATCH /clients/:id` - Actualizar cliente
- `DELETE /clients/:id` - Eliminar cliente

### Vendedores
- `GET /sellers` - Listar vendedores (con paginación)
- `GET /sellers/:id` - Obtener vendedor por ID
- `POST /sellers` - Crear vendedor
- `PATCH /sellers/:id` - Actualizar vendedor
- `DELETE /sellers/:id` - Eliminar vendedor

### Reuniones
- `GET /meetings` - Listar reuniones (con paginación)
- `GET /meetings/:id` - Obtener reunión por ID
- `POST /meetings` - Crear reunión
- `PATCH /meetings/:id` - Actualizar reunión
- `DELETE /meetings/:id` - Eliminar reunión

### Workers
- `GET /workers/status` - Estado de los workers
- `POST /workers/classify/:meetingId` - Disparar clasificación

## Docker

Para ejecutar con Docker:

```bash
# Construir imagen
docker build -t vambe-api-nestjs .

# Ejecutar contenedor
docker run -p 3000:3000 --env-file .env vambe-api-nestjs
```

## Migración desde Express

Esta versión mantiene la misma estructura de base de datos y endpoints que la versión original en Express, pero con las siguientes mejoras:

- **Validación automática** de datos de entrada
- **Manejo de errores** más robusto
- **Inyección de dependencias** nativa
- **Decoradores** para configuración
- **Tipado fuerte** con TypeScript
- **Estructura modular** más clara

## Próximos Pasos

1. Integrar con el sistema de workers existente
2. Añadir autenticación y autorización
3. Implementar logging avanzado
4. Añadir tests unitarios y de integración
5. Configurar CI/CD
