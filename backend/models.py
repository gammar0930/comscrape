from typing import Optional
from pydantic import BaseModel
from sqlalchemy import Column, Integer, String, Text, create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base

DATABASE_URL = "postgresql+psycopg2://postgres:admin@127.0.0.1:5432/backend"

engine = create_engine(DATABASE_URL)
metadata = MetaData()

Base = declarative_base()


class FileModel(Base):
    __tablename__ = "files"
    id = Column(Integer, primary_key=True, index=True)
    video_filename = Column(String, index=True, nullable=False)
    image_filename = Column(String, index=True, nullable=False)
    audio_filename = Column(String, index=True, nullable=False)
    text_data = Column(Text)


Base.metadata.create_all(bind=engine)
