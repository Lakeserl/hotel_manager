# HotelServer

A Spring Boot backend for hotel management, providing authentication, user management, and secure REST APIs.

## Features
- User registration and login (JWT-based authentication)
- Role-based access (Admin, Customer)
- Password hashing with BCrypt
- CORS configuration for frontend integration
- MySQL database support

## Tech Stack
- Java 24 
- Spring Boot 3.5
- Spring Security
- JPA/Hibernate
- MySQL
- JWT (io.jsonwebtoken 0.11.5)

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Lakeserl/hotel_manager
cd hotel_manager/HotelServer
```

### 2. Configure Database
Edit `src/main/resources/application.properties` with your MySQL credentials:
```
spring.datasource.url=jdbc:mysql://localhost:3306/{create own db}
spring.datasource.username={db_user}
spring.datasource.password={db_password}
```

### 3. Build the project
```bash
mvn clean install
```

### 4. Run the application
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080` by default.

## API Endpoints
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- InProcess

## Troubleshooting
- Ensure MySQL is running and accessible.
- Use only one version for all `io.jsonwebtoken` dependencies (0.11.5).
- If you see `NoSuchMethodError` or JWT errors, check your dependencies and secret key length.

## License
MIT (or your license here) 