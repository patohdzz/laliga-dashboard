# La Liga Live Dashboard

A full-stack web dashboard that displays La Liga standings and FC Barcelona fixture results using a React frontend, FastAPI backend, PostgreSQL database, and API-Football integration.

The project was built to practice full-stack development, REST API design, database caching, frontend data visualization, and AWS deployment.

## Live Demo

Live app: https://main.d1cng9t82dpcbn.amplifyapp.com

## Screenshots

### Live Dashboard

![La Liga Dashboard](screenshots/dashboard.png)

### Fixture Search

![Fixture Search](screenshots/fixtures.png)

### AWS Deployment

![AWS Deployment](screenshots/aws_deployment.png)

## Features

* View La Liga standings in a responsive table
* View FC Barcelona fixture results as match cards
* Search fixtures by team name
* Backend REST API built with FastAPI
* PostgreSQL caching for standings and fixtures
* Cache expiration logic to reduce unnecessary external API calls
* Secure environment variable support for API keys and database credentials
* React frontend organized with reusable components and service files
* Full AWS deployment using Amplify, API Gateway, Elastic Beanstalk, and RDS

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
* Amazon RDS
* pgAdmin

### Cloud / Deployment

* AWS Amplify
* Amazon API Gateway
* AWS Elastic Beanstalk
* Amazon RDS PostgreSQL

### External API

* API-Football

## Architecture

The deployed application follows this architecture:

```txt
AWS Amplify Frontend
↓
Amazon API Gateway HTTPS Endpoint
↓
AWS Elastic Beanstalk FastAPI Backend
↓
Amazon RDS PostgreSQL Database
↓
API-Football External API
```

The React frontend is deployed on AWS Amplify. Since Amplify serves the frontend over HTTPS, API Gateway is used as an HTTPS layer between the frontend and the backend.

API Gateway forwards requests to the FastAPI backend hosted on AWS Elastic Beanstalk. The backend connects to Amazon RDS PostgreSQL to retrieve cached standings and fixture data.

When the frontend requests standings or fixtures, the backend first checks PostgreSQL. If the cached data is still fresh, the backend returns the data directly from the database. If the data is missing or stale, the backend calls API-Football, updates PostgreSQL, and returns the refreshed data.

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

## Project Structure

```txt
laliga-dashboard/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── requirements.txt
│   ├── Procfile
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
├── amplify.yml
├── .gitignore
└── README.md
```

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
ALLOWED_ORIGINS=http://localhost:5173
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

For local development, the frontend uses:

```txt
http://127.0.0.1:8000
```

For deployment, the frontend uses a Vite environment variable:

```txt
VITE_API_BASE_URL=https://your-api-gateway-url.amazonaws.com
```

## Database Setup

This project uses PostgreSQL.

For local development, create a PostgreSQL database named:

```txt
laliga
```

The backend uses SQLAlchemy models to create the required tables automatically when the server starts.

Tables used:

```txt
standings
fixtures
```

For deployment, the database is hosted on Amazon RDS PostgreSQL.

## Environment Variables

The backend requires these environment variables:

```txt
API_FOOTBALL_KEY
DATABASE_URL
ALLOWED_ORIGINS
```

The frontend uses this environment variable in deployment:

```txt
VITE_API_BASE_URL
```

The real `.env` file is ignored by Git for security. Use `.env.example` as a safe template.

## Completed Work

* FastAPI backend setup
* API-Football integration
* PostgreSQL database connection
* Standings caching
* Fixtures caching
* Cache expiration logic
* React frontend setup with Vite
* Standings table component
* Fixture card component
* Fixture search/filter
* GitHub repository setup
* AWS Amplify frontend deployment
* AWS Elastic Beanstalk backend deployment
* Amazon RDS PostgreSQL database deployment
* Amazon API Gateway HTTPS routing

## Future Improvements

* Add a manual refresh button for cached data
* Add team selection instead of only Barcelona fixtures
* Add player statistics
* Improve UI styling and mobile responsiveness
* Add charts for points, goal difference, and team form
* Add automated tests for backend endpoints
* Add custom domain and HTTPS backend configuration

## What I Learned

This project helped me practice:

* Building REST APIs with FastAPI
* Connecting Python applications to PostgreSQL
* Using SQLAlchemy models for database tables
* Handling environment variables securely
* Creating reusable React components
* Fetching backend data from React
* Implementing frontend search and filtering
* Designing caching logic to reduce external API usage
* Deploying a full-stack application on AWS
* Using API Gateway as an HTTPS layer between frontend and backend
* Configuring CORS between deployed frontend and backend services
