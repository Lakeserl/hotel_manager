# Hotel Manager

A full-stack hotel management system with a modern Angular frontend and a secure Spring Boot backend.

---

## Project Structure

```
hotel_manager/
  ├── HotelServer/   # Spring Boot backend (Java)
  └── HotelWeb/      # Angular frontend (TypeScript)
```

---

## Technologies Used

### Backend (HotelServer)
- **Java 24** 
- **Spring Boot**
- **Spring Security**
- **Spring Data JPA (Hibernate)**
- **MySQL**
- **JWT**
- **Lombok**
- **Maven**

### Frontend (HotelWeb)
- **Angular 20**
- **TypeScript**
- **ng-zorro-antd** 
- **RxJS**
- **Karma/Jasmine**
- **Prettier** 

---

## Features
- User registration and login (JWT-based authentication)
- Role-based access (Admin, Customer)
- Password hashing with BCrypt
- Responsive, modern UI
- CORS configuration for frontend-backend integration
- MySQL database support

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Lakeserl/hotel_manager
cd hotel_manager
```

### 2. Backend Setup (HotelServer)
- Edit `HotelServer/src/main/resources/application.properties` with your MySQL credentials:
  ```
  spring.datasource.url=jdbc:mysql://localhost:3306/{db}
  spring.datasource.username={db_user}
  spring.datasource.password={db_password}
  ```
- Build and run:
  ```bash
  cd HotelServer
  mvn clean install
  mvn spring-boot:run
  ```
- The backend will start at `http://localhost:8080`.

### 3. Frontend Setup (HotelWeb)
- Install dependencies and run:
  ```bash
  cd ../HotelWeb
  npm install
  npm start
  ```
- The frontend will start at `http://localhost:4200`.

---

## API Endpoints (Backend)
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive JWT token
- 

