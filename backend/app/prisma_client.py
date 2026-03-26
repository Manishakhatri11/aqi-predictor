# # backend/app/prisma_client.py

# import os
# from prisma import Prisma

# prisma = Prisma()

# DATABASE_URL = os.environ.get("DATABASE_URL")
# prisma._engine.url = DATABASE_URL  # Prisma 7+ requires runtime URL

# async def connect_db():
#     await prisma.connect()

# async def disconnect_db():
#     await prisma.disconnect()