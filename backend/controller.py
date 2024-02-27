from sqlalchemy import select
from databases import Database
from models import FileModel, DATABASE_URL

database = Database(DATABASE_URL)


async def save_file_data(
    video_filename: str, image_filename: str, audio_filename: str, text_data: str
):
    query = FileModel.__table__.insert().values(
        video_filename=video_filename,
        image_filename=image_filename,
        audio_filename=audio_filename,
        text_data=text_data,
    )

    return await database.execute(query)


async def get_file_by_id(file_id: int):
    query = select(FileModel).where(FileModel.c.id == file_id)
    return await database.fetch_one(query)


async def get_all_files():
    query = select(FileModel)
    return await database.fetch_all(query)
