# Compliance Management API

A RESTful API for managing compliance-related tasks built with NestJS, PostgreSQL, and Docker. The system implements CQRS patterns, JWT authentication, and provides comprehensive API documentation.

## Features

- Clean Architecture with modular design
- CQRS Pattern for scalable operations
- JWT Authentication with role-based access control
- PostgreSQL database with TypeORM
- Auto-generated Swagger/OpenAPI documentation
- Request validation with class-validator
- Docker support for development and deployment

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL (if running without Docker)

## Setup and Installation

### Option 1: Docker (Recommended)

1. Clone the repository and navigate to the project directory
2. Copy the environment file:
   ```bash
   cp .env.dev .env
   ```
3. Start the application:
   ```bash
   docker-compose up -d
   ```

The API will be available at `http://localhost:3000`

### Option 2: Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy the environment file:
   ```bash
   cp .env.dev .env
   ```
3. Start PostgreSQL database and update .env with your credentials
4. Run the application:
   ```bash
   npm run start:dev
   ```

## Running the Project Locally

After installation, the following services will be available:

- API Base URL: `http://localhost:3000/api/v1`
- Swagger Documentation: `http://localhost:3000/api/docs/v1/swagger`
- Database: PostgreSQL on port 5432

### Default User Accounts

The system automatically creates default users on startup:

**Admin User:**
- Username: `admin`
- Password: `admin123`
- Role: `admin`

**Standard User:**
- Username: `user`
- Password: `user123`
- Role: `standard`

## API Endpoints

### Authentication

**POST /auth/login**
- Description: Authenticate user and receive JWT token
- Body: `{ "username": "admin", "password": "admin123" }`
- Response: `{ "access_token": "jwt_token", "user": {...} }`

**GET /auth/users** (Admin only)
- Description: Get all users in the system
- Headers: `Authorization: Bearer <token>`
- Response: Array of user objects

### Tasks

**GET /tasks**
- Description: Get all compliance tasks with optional filtering
- Headers: `Authorization: Bearer <token>`
- Query Parameters:
  - `framework` (optional): Filter by compliance framework
  - `category` (optional): Filter by task category
- Response: Array of task objects

**GET /tasks/:id**
- Description: Get a specific task by ID
- Headers: `Authorization: Bearer <token>`
- Parameters: `id` (UUID)
- Response: Task object

**POST /tasks**
- Description: Create a new compliance task
- Headers: `Authorization: Bearer <token>`
- Body:
  ```json
  {
    "name": "Implement access control review for an enterprise-grade compliance management system",
    "description": "Review and update access control policies",
    "framework": "DSALTA",
    "category": "Access Control",
    "status": "open"
  }
  ```
- Response: Created task object

**PUT /tasks/:id**
- Description: Update an existing task
- Headers: `Authorization: Bearer <token>`
- Parameters: `id` (UUID)
- Body: Partial task object with fields to update
- Response: Updated task object

**DELETE /tasks/:id**
- Description: Delete a task
- Headers: `Authorization: Bearer <token>`
- Parameters: `id` (UUID)
- Response: 204 No Content

## Task Schema

```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "framework": "string",
  "category": "string",
  "status": "open | in_progress | done",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

## Example Usage

### Authentication
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

### Create Task
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Security Assessment",
    "description": "Conduct quarterly security assessment",
    "framework": "DSALTA",
    "category": "Security",
    "status": "open"
  }'
```

### Get Tasks with Filtering
```bash
curl -X GET "http://localhost:3000/api/v1/tasks?framework=DSALTA&category=Security" \
  -H "Authorization: Bearer <your_token>"
```

## Development Scripts

```bash
npm run start:dev    # Start development server
npm run build        # Build for production
npm run start:prod   # Start production server
```

## Docker Commands

```bash
docker-compose up -d          # Start all services
docker-compose logs -f        # View logs
docker-compose down           # Stop all services
docker-compose up --build     # Rebuild and start
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment | development |
| PORT | Server port | 3000 |
| DATABASE_HOST | PostgreSQL host | localhost |
| DATABASE_PORT | PostgreSQL port | 5432 |
| DATABASE_USERNAME | Database username | admin_user |
| DATABASE_PASSWORD | Database password | admin_password1234 |
| DATABASE_NAME | Database name | compliance_management_db |
| JWT_SECRET | JWT secret key | s3cR3t!@#Z8vWmL2qXnA9bR$Tp1YgJc7Ku0fD |
| JWT_EXPIRES_IN | JWT expiration | 24h |

## API Documentation

Complete API documentation is available via Swagger UI at:
`http://localhost:3000/api/docs/v1/swagger`

The Swagger interface provides:
- Interactive API testing
- Request/response schemas
- Authentication testing with Bearer tokens
- Complete endpoint documentation

## Project Structure

```
src/
├── main.ts                 # Application entry point
├── app.module.ts           # Root module
├── auth/                   # Authentication module
├── tasks/                  # Tasks module
├── config/                 # Configuration
├── shared/                 # Shared utilities
└── docs/                   # Documentation setup
```


