
# MERN Stack To-Do List

A full-stack To-Do List application developed using MongoDB,
Express.js, React.js and Node.js for the Web Technology Assignment 2.

## Features

- Add new tasks
- View all saved tasks
- Mark tasks complete or incomplete
- Delete tasks
- Validate empty task titles
- Store tasks persistently in MongoDB
- REST API with appropriate HTTP status codes
- React state updates without page reloads

## Technology Stack

- MongoDB Atlas
- Express.js
- React.js
- Node.js
- Mongoose
- Vite
- Git and GitHub

## Project Structure

- backend/models/Task.js - Task schema
- backend/routes/tasks.js - REST API routes
- backend/server.js - Express server
- frontend/src/App.jsx - Main React component
- frontend/src/components/ - Reusable React components

## Prerequisites

Install Node.js and npm, and create a MongoDB Atlas database.

## Backend Setup

Open a terminal:

    cd backend
    npm install

Create a `.env` file inside backend with:

    PORT=5000
    MONGO_URI=your_mongodb_connection_string

Start the backend:

    npm run dev

## Frontend Setup

Open another terminal from the project root:

    cd frontend
    npm install
    npm run dev

Open the URL printed by Vite, normally:

    http://localhost:5173

The backend runs on port 5000.

## API Endpoints

| Method | Endpoint | Purpose |
| GET | /api/tasks | Fetch tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

## Environment Variables

`MONGO_URI` contains the MongoDB connection string.
`PORT` specifies the backend port.

Never commit the actual `.env` file or database credentials.

## Author

Abhinav V S
B23CS1102
