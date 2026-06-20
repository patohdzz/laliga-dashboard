from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from database import Base

class Standing(Base):
    __tablename__ = "standings"

    id = Column(Integer, primary_key=True, index=True)
    rank = Column(Integer)
    team_id = Column(Integer)
    team_name = Column(String(100))
    points = Column(Integer)
    goals_diff = Column(Integer)
    played = Column(Integer)
    won = Column(Integer)
    drawn = Column(Integer)
    lost = Column(Integer)
    updated_at = Column(DateTime, server_default=func.now())

# defines what your tables look like in Python