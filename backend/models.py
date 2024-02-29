from typing import Optional
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Text, create_engine, MetaData, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

# My code
import os, sys
from dotenv import load_dotenv

# Load .env file
load_dotenv()

database_url = os.getenv("DATABASE_URL")

engine = create_engine(database_url)
metadata = MetaData()

Base = declarative_base()

class FileModel(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    video_filename = Column(String, index=True, nullable=False)
    image_filename = Column(String, index=True, nullable=False)
    audio_filename = Column(String, index=True, nullable=False)
    text_data = Column(Text)
    time_created = Column(DateTime(timezone=True), server_default=func.now())
    time_updated = Column(DateTime(timezone=True), onupdate=func.now())


Base.metadata.create_all(bind=engine)
