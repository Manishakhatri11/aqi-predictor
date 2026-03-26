from fastapi import APIRouter
from app.services.aqi_service import fetch_and_store_aqi, get_saved_aqi

router = APIRouter()

@router.post("/fetch")
async def fetch_aqi():
    return await fetch_and_store_aqi()

@router.get("/")
async def get_aqi():
    return await get_saved_aqi()