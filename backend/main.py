from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from typing import Optional
from fastapi.responses import JSONResponse
from controller import save_file_data, get_file_by_id, get_all_files
from databases import Database
import os

app = FastAPI()

DATABASE_URL = "postgres://postgres:admin@127.0.0.1:5432/backend"

database = Database(DATABASE_URL)

@app.get("/")
def root():
    return {"message": "Hello World"}


@app.on_event("startup")
async def startup_db_client():
    await database.connect()


@app.on_event("shutdown")
async def shutdown_db_client():
    await database.disconnect()


@app.post("/upload")
async def upload_files(
    video: UploadFile = File(...),
    image: UploadFile = File(...),
    audio: UploadFile = File(...),
    text: str = Form(...),
):
    # Create an "uploads" folder if it doesn't exist
    upload_folder = "uploads"
    os.makedirs(upload_folder, exist_ok=True)

    # Save files with full path
    video_filename = os.path.join(upload_folder, video.filename)
    image_filename = os.path.join(upload_folder, image.filename)
    audio_filename = os.path.join(upload_folder, audio.filename)

    print(
        "This is the backend",
        video_filename,
        image_filename,
        audio_filename,
        text,
    )

    # Save video file
    video_filename = video.filename
    with open(video_filename, "wb") as video_file:
        video_file.write(video.file.read())

    # Save image file
    image_filename = image.filename
    with open(image_filename, "wb") as image_file:
        image_file.write(image.file.read())

    # Save audio file
    audio_filename = audio.filename
    with open(audio_filename, "wb") as audio_file:
        audio_file.write(audio.file.read())

    # Process text data
    processed_text = text.upper()

    # Save data to database
    file_id = await save_file_data(
        video_filename, image_filename, audio_filename, processed_text
    )

    return JSONResponse(
        content={
            "message": "Files uploaded and data saved successfully",
            "file_id": file_id,
        }
    )


@app.get("/files/{file_id}")
async def get_file(file_id: int):
    file_data = await get_file_by_id(file_id)
    if file_data is None:
        raise HTTPException(status_code=404, detail="File not found")

    return file_data


@app.get("/files")
async def get_all_files_endpoint():
    all_files = await get_all_files()
    return all_files
