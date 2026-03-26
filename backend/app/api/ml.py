from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services import ml_service, metrics_service
import os
import pandas as pd
# from app.services.aqi_service import save_metrics


router = APIRouter(prefix="/ml", tags=["ML Prediction"])

# ----------------------------
# Paths for datasets
# ----------------------------
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(ROOT_DIR, "..", "data")  # one level up
FULL_POLLUTANTS_PATH = os.path.join(DATA_DIR, "full_pollutants.csv")
TRAINING_DATA_PATH = os.path.join(DATA_DIR, "training_data.csv")
TEST_DATA_PATH = os.path.join(DATA_DIR, "test_data.csv")

# ----------------------------
# Input Schemas
# ----------------------------
class PM25Input(BaseModel):
    no2: float
    so2: float
    o3: float
    co: float
    hour: int
    day: int
    month: int
    day_of_week: int
    is_weekend: int
    pm10: float

class TomorrowInput(BaseModel):
    no2: float
    so2: float
    o3: float
    co: float
    pm25: float
    hour: int
    day: int
    month: int
    day_of_week: int
    is_weekend: int
    pm10: float

class MetricsSchema(BaseModel):
    modelName: str
    r2Score: float
    rmse: float
    mae: float
    crossValidation: float



# ----------------------------
# Prediction Routes
# ----------------------------
@router.post("/pm25")
async def api_predict_pm25(data: PM25Input):
    """
    Predict PM2.5 and AQI for today
    """
    return ml_service.predict_pm25(data.dict())

@router.post("/tomorrow")
async def api_predict_tomorrow(data: TomorrowInput):
    """
    Predict all pollutants and AQI for tomorrow same hour
    """
    return ml_service.predict_tomorrow(data.dict())

@router.post("/evaluate-model")
async def evaluate_model():
    result = await metrics_service.evaluate_and_save()
    return {
        "message": "Model evaluated and metrics saved successfully",
        "data": result
    }