# RBAC JWT Auth API

A backend API for authentication and authorization built with NestJS, implementing JWT-based authentication and Role-Based Access Control (RBAC).

## 🛠 Tech Stack

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- Docker
- JWT

## 🚀 Features

- User authentication with JWT
- Role-based authorization (USER / ADMIN)
- Protected routes with guards
- Dockerized environment for easy setup

## 🚀 Running the project

```bash
git clone https://github.com/your-username/rbac-jwt-auth-api.git
cd rbac-jwt-auth-api

cp .env.example .env
docker compose up --build
```

## 🔐 Example Endpoint

### POST /auth/login

```json
{
    "email": "test@example.com",
    "password": "123456789"
}
```

## 🧪 API Testing

You can test endpoints using the included `.http` file (VS Code REST Client).

Alternatively, you can use tools like Postman or curl.

## 📁 Project Structure

```
src/
 ├── auth/         # authentication (JWT)
 ├── users/        # user management
 ├── games/        # games domain
 ├── developers/   # developers domain
 ├── common/       # shared utilities
 ├── app.module.ts
 └── main.ts
```

## 🧠 Architecture

This project follows modular architecture inspired by DDD principles using NestJS.

## 📌 Future Improvements

- Add refresh tokens
- Add tests
- Improve security layers
