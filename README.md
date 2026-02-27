# MERN Task Management App

A full-stack Task Management application built using the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User Authentication (Register/Login) with JWT.
- Task Management (Create, Read, Update, Delete).
- Mark tasks as Pending/Completed.
- Edit Task functionality.
- Logout functionality.
- Protected backend routes.
- Component-based React frontend.

## Architecture

The backend follows a layered architecture pattern:
- **Routes**: Define API endpoints and direct to controllers. (`backend/routes/`)
- **Controllers**: Handle HTTP requests and responses. (`backend/controllers/`)
- **Services**: Contain business logic and database interactions. (`backend/services/`)
- **Models**: Mongoose schemas defining database structure. (`backend/models/`)

## Prerequisites

- Node.js installed on your local machine.
- MongoDB Atlas account (or local MongoDB).

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository_url>
cd mern-test-Parvaggarwal01
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Make sure you have a `.env` file in the `backend` directory containing:
  ```env
  PORT=5000
  MONGO_URI=<your_mongodb_connection_string>
  JWT_SECRET=<your_jwt_secret>
  ```
- Start the backend server:
  ```bash
  npm start
  ```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
- Start the frontend dev server:
  ```bash
  npm run dev
  ```

The frontend will run on `http://localhost:5173` (or another port if 5173 is in use), and the backend runs on `http://localhost:5000`.