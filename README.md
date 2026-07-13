# Visitor Pass Management System - final assignment

A full-stack MERN application for managing visitor passes.
This project is intentionally kept simple for learning: it stores the pass number as the QR value and has a verification endpoint ready to connect to a QR scanner library later.

## Features

- User authentication (JWT-based) with role-based access control (Admin, Security, Employee, Visitor)
- Visitor appointment scheduling and management
- Visitor pass generation and management
- Check-in and check-out functionality
- Role-based dashboards

## Tech Stack

- Frontend: React, React Router, Axios
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JWT
- Password Hashing: bcryptjs

## Project Structure

```
.
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── .env
├── frontend/
│   └── src/
│       ├── context/
│       ├── pages/
│       ├── App.js
│       └── index.js
└── package.json
```

## Getting Started

### 1. Prerequisites

- Node.js installed
- MongoDB Atlas account (or local MongoDB)

### 2. Backend Setup

```bash
# Install dependencies
npm install

# Configure environment variables in backend/.env
MONGO_URI=your-mongodb-uri
PORT=8000
JWT_SECRET=your-secret-key
NODE_ENV=development

# Start backend server
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 4. Access the Application

- Backend API: http://localhost:8000
- Frontend: http://localhost:3000

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (protected)

### Appointments
- `POST /api/appointments` - Create an appointment (protected)
- `GET /api/appointments` - Get user's appointments (protected)
- `PATCH /api/appointments/:id/status` - Update appointment status (Admin/Employee only)

### Visitor Passes
- `POST /api/visitor-passes` - Create visitor pass (Admin/Security only)
- `GET /api/visitor-passes` - Get visitor passes (protected)
- `POST /api/visitor-passes/checkin` - Check-in visitor (Admin/Security only)
- `POST /api/visitor-passes/checkout` - Check-out visitor (Admin/Security only)

## License

MIT
# Visitor-Pass-Management-System
