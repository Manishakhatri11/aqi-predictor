from prisma import Prisma
import os
from dotenv import load_dotenv

load_dotenv()  # load DATABASE_URL from .env

db = Prisma()  # NO adapter or url here

async def connect_db():
    await db.connect()

async def disconnect_db():
    await db.disconnect()