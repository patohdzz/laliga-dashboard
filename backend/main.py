from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from database import get_db, engine
from models import Standing, Fixture, Base
from datetime import datetime, timedelta
import requests
import os

load_dotenv()

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

API_KEY = os.getenv("API_FOOTBALL_KEY")
BASE_URL = "https://v3.football.api-sports.io"
HEADERS = {
    "x-apisports-key": API_KEY
}

CACHE_DURATION = timedelta(hours=1)

def is_cache_fresh(updated_at):
    if updated_at is None:
        return False

    return datetime.utcnow() - updated_at < CACHE_DURATION

@app.get("/")
def root():
    return {"message": "La Liga Dashboard API"}

@app.get("/standings")
def get_standings(db: Session = Depends(get_db)):
    existing = db.query(Standing).first()

    if existing and is_cache_fresh(existing.updated_at):
        return db.query(Standing).all()

    response = requests.get(
        f"{BASE_URL}/standings",
        headers=HEADERS,
        params={"league": 140, "season": 2024}
    )

    data = response.json()
    standings_data = data["response"][0]["league"]["standings"][0]

    db.query(Standing).delete()

    for team in standings_data:
        standing = Standing(
            rank=team["rank"],
            team_id=team["team"]["id"],
            team_name=team["team"]["name"],
            points=team["points"],
            goals_diff=team["goalsDiff"],
            played=team["all"]["played"],
            won=team["all"]["win"],
            drawn=team["all"]["draw"],
            lost=team["all"]["lose"]
        )

        db.add(standing)

    db.commit()

    return db.query(Standing).all()

@app.get("/fixtures")
def get_fixtures(db: Session = Depends(get_db)):
    existing = db.query(Fixture).first()

    if existing and is_cache_fresh(existing.updated_at):
        return db.query(Fixture).all()

    response = requests.get(
        f"{BASE_URL}/fixtures",
        headers=HEADERS,
        params={"league": 140, "season": 2024, "team": 529}
    )

    data = response.json()
    fixtures_data = data["response"]

    db.query(Fixture).delete()

    for match in fixtures_data:
        fixture = Fixture(
            fixture_id=match["fixture"]["id"],
            date=match["fixture"]["date"],
            status=match["fixture"]["status"]["short"],
            home_team=match["teams"]["home"]["name"],
            away_team=match["teams"]["away"]["name"],
            home_goals=match["goals"]["home"],
            away_goals=match["goals"]["away"]
        )

        db.add(fixture)

    db.commit()

    return db.query(Fixture).all()

# handles requests and uses both files