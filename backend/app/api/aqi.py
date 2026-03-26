from fastapi import APIRouter
from app.services.aqi_service import fetch_and_store_aqi, get_saved_aqi, get_7days_avg_aqi, get_today_aqi, get_saved_metrics

router = APIRouter()

@router.post("/fetch")
async def fetch_aqi():
    return await fetch_and_store_aqi()

@router.get("/")
async def get_aqi():
    return await get_saved_aqi()

@router.get("/last7days")
async def get_last7days():
    return await get_7days_avg_aqi()

@router.get("/today")
async def get_today():
    return await get_today_aqi()

@router.post("/metrics")
async def get_metrics():
    return await get_saved_metrics()