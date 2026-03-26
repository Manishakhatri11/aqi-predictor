# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.aqi import router as aqi_router
from app.api.ml import router as ml_router
from app.core.database import connect_db, disconnect_db
# from prisma_client import connect_db, disconnect_db
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from zoneinfo import ZoneInfo


from dotenv import load_dotenv
load_dotenv()

app = FastAPI(title="AQI Backend API")
scheduler = AsyncIOScheduler(timezone=ZoneInfo("UTC"))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

async def scheduled_fetch():
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{now}] Running AQI fetch job...")
    await fetch_and_store_aqi()


@app.on_event("startup")
async def startup():

    await connect_db();

    scheduler.add_job(
        scheduled_fetch,
        CronTrigger(
            hour="*/3",
            minute=15
        ),
        id="aqi_job",                
        replace_existing=True,
        max_instances=1, 
        coalesce=True
    )

    scheduler.start()

@app.on_event("shutdown")
async def shutdown():
    await disconnect_db()

@app.get("/health")
async def health_check():
    return {"status": "ok"}

# Existing AQI routes
app.include_router(aqi_router, prefix="/api/v1/aqi", tags=["AQI"])
# New ML routes
app.include_router(ml_router, prefix="/api/v1/predict", tags=["ML Prediction"])