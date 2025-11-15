# Feedback Dashboard

A full-stack feedback management system built with React and Express.js.

## Features

- Submit feedback with name, email, message, and rating (1-5)
- View all feedbacks in a table format
- Analytics dashboard showing total feedbacks, average rating, positive vs negative ratings
- SQLite database for data persistence
- Responsive design

## Tech Stack

- **Frontend**: React, Axios
- **Backend**: Node.js, Express.js
- **Database**: SQLite
- **Deployment**: Vercel (Frontend), Render (Backend)

## Local Development

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will run on http://localhost:5000

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run on http://localhost:3000

## API Endpoints

- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback` - Get all feedbacks
- `GET /api/stats` - Get analytics data

## Deployment

### Backend (Render)
1. Connect your GitHub repository to Render
2. Set build command: `npm install`
3. Set start command: `npm start`

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set framework preset to "Create React App"
3. Set environment variable: `REACT_APP_API_URL=your-backend-url`

## Environment Variables

### Backend (.env)
```
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Database Schema

```sql
CREATE TABLE feedbacks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```