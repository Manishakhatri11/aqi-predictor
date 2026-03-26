import os
import pandas as pd
import joblib

from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from sklearn.model_selection import TimeSeriesSplit, cross_val_score

from app.core.database import db


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "../models")

# Load models
pm25_model = joblib.load(os.path.join(MODEL_DIR, "air_quality_model_v1.pkl"))
tomorrow_model = joblib.load(os.path.join(MODEL_DIR, "tomorrow_same_hour_model_simple.pkl"))

POLLUTANTS = ["no2", "so2", "o3", "co", "pm10", "pm25"]

FEATURE_COLUMNS = [
    "no2", "so2", "o3", "co", "pm10", "pm25",
    "hour", "day", "month", "day_of_week", "is_weekend"
]

# ML Prediction Functions
def predict_pm25(input_data: dict):
    df = pd.DataFrame([input_data])
    pm25_pred_array = pm25_model.predict(df)
    pm25_pred = float(pm25_pred_array[0])

    input_data["pm25"] = pm25_pred
    print(round(pm25_pred,2))
     # Calculate US AQI
    aqi_result = calculate_us_aqi(input_data)
    return {
        "pm25": round(pm25_pred, 2),
        **aqi_result
    }

def predict_tomorrow(input_data: dict):

    df = pd.DataFrame([input_data])
    df = df[FEATURE_COLUMNS]
    pred = tomorrow_model.predict(df)[0]
    result = {p: round(pred[i],2) for i,p in enumerate(POLLUTANTS)}
    result["aqi"] = calculate_us_aqi(result)
    return result

# ---------- Breakpoints ----------
PM25_BREAKPOINTS = [
    (0.0, 12.0, 0, 50),
    (12.1, 35.4, 51, 100),
    (35.5, 55.4, 101, 150),
    (55.5, 150.4, 151, 200),
    (150.5, 250.4, 201, 300),
    (250.5, 350.4, 301, 400),
    (350.5, 500.4, 401, 500),
]

PM10_BREAKPOINTS = [
    (0, 54, 0, 50),
    (55, 154, 51, 100),
    (155, 254, 101, 150),
    (255, 354, 151, 200),
    (355, 424, 201, 300),
    (425, 504, 301, 400),
    (505, 604, 401, 500),
]

CO_BREAKPOINTS = [
    (0.0, 4.4, 0, 50),
    (4.5, 9.4, 51, 100),
    (9.5, 12.4, 101, 150),
    (12.5, 15.4, 151, 200),
    (15.5, 30.4, 201, 300),
    (30.5, 40.4, 301, 400),
    (40.5, 50.4, 401, 500),
]

NO2_BREAKPOINTS = [
    (0, 53, 0, 50),
    (54, 100, 51, 100),
    (101, 360, 101, 150),
    (361, 649, 151, 200),
    (650, 1249, 201, 300),
    (1250, 1649, 301, 400),
    (1650, 2049, 401, 500),
]

SO2_BREAKPOINTS = [
    (0, 35, 0, 50),
    (36, 75, 51, 100),
    (76, 185, 101, 150),
    (186, 304, 151, 200),
    (305, 604, 201, 300),
    (605, 804, 301, 400),
    (805, 1004, 401, 500),
]

O3_BREAKPOINTS = [
    (0.000, 0.054, 0, 50),
    (0.055, 0.070, 51, 100),
    (0.071, 0.085, 101, 150),
    (0.086, 0.105, 151, 200),
    (0.106, 0.200, 201, 300),
]


# ---------- Unit Conversion (µg/m³ → ppb/ppm) ----------

def ugm3_to_ppb(value, molecular_weight):
    return (value * 24.45) / molecular_weight


def ugm3_to_ppm(value, molecular_weight):
    return ugm3_to_ppb(value, molecular_weight) / 1000


# ---------- AQI Formula ----------

def calculate_individual_aqi(concentration, breakpoints):
    for c_low, c_high, i_low, i_high in breakpoints:
        if c_low <= concentration <= c_high:
            return round(
                ((i_high - i_low) / (c_high - c_low)) *
                (concentration - c_low) + i_low
            )
    return 0


# ---------- AQI Category ----------

def get_aqi_category(aqi):
    if aqi <= 50:
        return "Good", "#00E400"
    elif aqi <= 100:
        return "Moderate", "#FFFF00"
    elif aqi <= 150:
        return "Unhealthy for Sensitive Groups", "#FF7E00"
    elif aqi <= 200:
        return "Unhealthy", "#FF0000"
    elif aqi <= 300:
        return "Very Unhealthy", "#8F3F97"
    else:
        return "Hazardous", "#7E0023"


# ---------- MAIN FUNCTION ----------

def calculate_us_aqi(data: dict) -> dict:

    # PM stay same
    pm25 = float(data.get("pm25", 0))
    pm10 = float(data.get("pm10", 0))

    # Convert gases from µg/m³
    no2_ppb = ugm3_to_ppb(float(data.get("no2", 0)), 46)
    so2_ppb = ugm3_to_ppb(float(data.get("so2", 0)), 64)
    o3_ppm = ugm3_to_ppm(float(data.get("o3", 0)), 48)
    co_ppm = ugm3_to_ppm(float(data.get("co", 0)), 28)

    pollutant_aqi = {
        "pm25": calculate_individual_aqi(pm25, PM25_BREAKPOINTS),
        "pm10": calculate_individual_aqi(pm10, PM10_BREAKPOINTS),
        "no2": calculate_individual_aqi(no2_ppb, NO2_BREAKPOINTS),
        "so2": calculate_individual_aqi(so2_ppb, SO2_BREAKPOINTS),
        "o3": calculate_individual_aqi(o3_ppm, O3_BREAKPOINTS),
        "co": calculate_individual_aqi(co_ppm, CO_BREAKPOINTS),
    }

    # Overall AQI = max
    overall_aqi = max(pollutant_aqi.values())

    # Dominant pollutant
    dominant_pollutant = max(pollutant_aqi, key=pollutant_aqi.get)

    category, color = get_aqi_category(overall_aqi)

    return {
        "aqi": overall_aqi,
        "category": category,
        "color": color,
        "dominant_pollutant": dominant_pollutant
    }

async def save_metrics(data1: dict) -> dict:
    result = await db.modelmetrics.create(
        data= {
            "modelName": data1["modelName"],
            "r2Score": data1["r2Score"],
            "rmse": data1["rmse"],
            "mae": data1["mae"],
            "crossValidation": data1["crossValidation"]
        }
    )

    return result