# CQCIAS Personas

Aplicación para consultar personas activas. El proyecto utiliza Angular para la interfaz, Spring Boot para la API y MySQL para almacenar los datos.

## Tecnologías

- Angular 21
- Bootstrap 5.3
- Spring Boot 4.1
- Java 17
- MySQL 8.4
- Docker

## Estructura

```text
backend/   API REST y configuración de MySQL
frontend/  Aplicación Angular
```

## Requisitos

- Docker Desktop
- Node.js 22 y npm para ejecutar el frontend sin Docker
- Java 17 para ejecutar el backend sin Docker

## Backend y base de datos

Antes del primer inicio, desde la carpeta `backend`, crea el archivo local de variables:

```powershell
Copy-Item .env.example .env
```

Edita `.env` y reemplaza las dos contraseñas de ejemplo. Después inicia la aplicación completa:

```bash
docker compose up --build
```

Este comando inicia el frontend en `http://localhost:4200`, la API en `http://localhost:8080` y MySQL en el puerto local `3307`. Los puertos solo se publican en `localhost`.

Para detener los contenedores:

```bash
docker compose down
```

Para consultar los datos de prueba directamente en MySQL:

```bash
docker exec -it cqcias-mysql mysql -u cqcias -p CQCIAS
```

Escribe la contraseña configurada en `backend/.env` y ejecuta:

```sql
SELECT id, nombre, primer_apellido, segundo_apellido, telefono, estatus
FROM persona;
```

## Frontend

Con el backend en ejecución, desde la carpeta `frontend`:

```bash
npm ci
npm start
```

La aplicación estará disponible en `http://localhost:4200`.

También se puede construir el frontend de forma independiente:

```bash
docker build -t cqcias-frontend .
docker run --rm -p 4200:8080 cqcias-frontend
```

## API

La aplicación consulta las personas activas mediante:

```http
GET /api/personas
```

Cada persona contiene los campos `id`, `nombre`, `primer_apellido`, `segundo_apellido`, `telefono` y `estatus`. El endpoint devuelve únicamente registros con estatus `A`.

## Pruebas

Backend:

```bash
./mvnw test
```

En Windows también se puede usar `mvnw.cmd test`.

Frontend:

```bash
npm test -- --watch=false
```
