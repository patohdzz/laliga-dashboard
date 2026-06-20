# La Liga Live Dashboard

A full-stack web dashboard that displays La Liga standings and FC Barcelona fixtures using a React frontend, FastAPI backend, PostgreSQL database, and API-Football integration.

The project was built to practice full-stack development, REST API design, database caching, and frontend data visualization.

## Features

* View current La Liga standings in a responsive table
* View FC Barcelona fixture results as match cards
* Search fixtures by team name
* Backend REST API built with FastAPI
* PostgreSQL caching for standings and fixtures
* Cache expiration logic to reduce unnecessary external API calls
* Environment variable support for secure API keys and database credentials
* React frontend organized with reusable components and service files

## Tech Stack

### Frontend

* React
* JavaScript
* Vite
* CSS

### Backend

* Python
* FastAPI
* Uvicorn
* SQLAlchemy
* Requests
* python-dotenv

### Database

* PostgreSQL
* pgAdmin

### External API

* API-Football

## Project Structure

```txt
laliga-dashboard/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   ├── .env.example
│   └── venv/                # ignored by Git
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StandingsTable.jsx
│   │   │   └── MatchList.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── node_modules/        # ignored by Git
│
├── .gitignore
└── README.md
```

## How It Works

The app follows a full-stack architecture:

```txt
React Frontend
↓
FastAPI Backend
↓
PostgreSQL Database
↓
API-Football
```

The React frontend does not call API-Football directly. Instead, it calls the FastAPI backend.

When the frontend requests standings or fixtures, the backend first checks PostgreSQL. If the cached data is still fresh, the backend returns the data from the database. If the data is missing or stale, the backend calls API-Football, updates PostgreSQL, and returns the refreshed data.

This reduces unnecessary external API calls and improves performance.

## API Endpoints

### Root

```txt
GET /
```

Returns a basic API message.

### Standings

```txt
GET /standings
```

Returns La Liga standings from PostgreSQL cache or refreshes from API-Football if needed.

### Fixtures

```txt
GET /fixtures
```

Returns FC Barcelona fixtures from PostgreSQL cache or refreshes from API-Football if needed.

## Backend Setup

Navigate to the backend folder:

```bash
cd backend
```

Create and activate a virtual environment:

```bash
python -m venv venv
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file using `.env.example` as a guide:

```txt
API_FOOTBALL_KEY=your_api_key_here
DATABASE_URL=postgresql://postgres:your_password_here@localhost:5432/laliga
```

Start the backend server:

```bash
uvicorn main:app --reload
```

The backend will run at:

```txt
http://127.0.0.1:8000
```

## Frontend Setup

Navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at:

```txt
http://localhost:5173
```

## Database Setup

This project uses PostgreSQL.

Create a PostgreSQL database named:

```txt
laliga
```

The backend uses SQLAlchemy models to create the required tables automatically when the server starts.

Tables used:

```txt
standings
fixtures
```

## Environment Variables

The backend requires these environment variables:

```txt
API_FOOTBALL_KEY
DATABASE_URL
```

The real `.env` file is ignored by Git for security. Use `.env.example` as a safe template.

## Current Status

Completed:

* FastAPI backend setup
* API-Football integration
* PostgreSQL database connection
* Standings caching
* Fixtures caching
* Cache expiration logic
* React frontend setup
* Standings table component
* Fixture card component
* Fixture search/filter
* GitHub repository setup

Planned improvements:

* Add deployment
* Improve UI styling
* Add manual refresh button
* Add more teams or league-wide fixtures
* Add screenshots to README
* Add team/player detail pages

## What I Learned

This project helped me practice:

* Building REST APIs with FastAPI
* Connecting Python applications to PostgreSQL
* Using SQLAlchemy models for database tables
* Handling environment variables securely
* Creating reusable React components
* Fetching backend data from React
* Implementing frontend search/filtering
* Designing caching logic to reduce external API usage
* Organizing a full-stack project for GitHub
