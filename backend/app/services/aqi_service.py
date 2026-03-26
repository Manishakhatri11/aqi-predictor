import httpx
from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
import pytz
import os
from app.core.database import db
from app.services.ml_service import predict_tomorrow
import pandas as pd
from collections import defaultdict
from statistics import mean

AIR_QUALITY_URL = os.getenv("AIR_QUALITY_URL")

async def fetch_and_store_aqi():

    async with httpx.AsyncClient() as client:
        response = await client.get(AIR_QUALITY_URL)
        data = response.json()

    current = data.get("current", {})

    api_time = current.get("time")
    utc_time = datetime.fromisoformat(api_time).replace(tzinfo=pytz.utc)

    pm25 = current.get("pm2_5")
    pm10 = current.get("pm10")
    co = current.get("carbon_monoxide")
    no2 = current.get("nitrogen_dioxide")
    so2 = current.get("sulphur_dioxide")
    o3 = current.get("ozone")

    latitude = data.get("latitude")
    longitude = data.get("longitude")

    saved_current = await db.airquality.create(
        data={
            "latitude": latitude,
            "longitude": longitude,
            "us_aqi": current.get("us_aqi"),
            "pm10": pm10,
            "pm2_5": pm25,
            "carbon_monoxide": co,
            "nitrogen_dioxide": no2,
            "sulphur_dioxide": so2,
            "ozone": o3,
            "measuredAt": utc_time,
        }
    )

    # -----------------------------
    # PREPARE ML INPUT
    # -----------------------------
    input_data = {
        "no2": no2,
        "so2": so2,
        "o3": o3,
        "co": co,
        "pm10": pm10,
        "pm25": pm25,
        "hour": utc_time.hour,
        "day": utc_time.day,
        "month": utc_time.month,
        "day_of_week": utc_time.weekday(),
        "is_weekend": 1 if utc_time.weekday() >= 5 else 0,
    }

    tomorrow_prediction = predict_tomorrow(input_data)

    tomorrow_time = utc_time + timedelta(days=1)

    print(tomorrow_prediction)

    saved_prediction = await db.airqualityprediction.create(
        data={
            "latitude": latitude,
            "longitude": longitude,
            "us_aqi": tomorrow_prediction["aqi"]["aqi"],
            "pm10": tomorrow_prediction["pm10"],
            "pm2_5": tomorrow_prediction["pm25"],
            "carbon_monoxide": tomorrow_prediction["co"],
            "nitrogen_dioxide": tomorrow_prediction["no2"],
            "sulphur_dioxide": tomorrow_prediction["so2"],
            "ozone": tomorrow_prediction["o3"],
            "predictedFor": tomorrow_time,
            "basedOn": utc_time,
        }
    )

    return {
        "current_saved": saved_current,
        "prediction_saved": saved_prediction
    }

async def get_saved_aqi():
    nepal_tz = pytz.timezone("Asia/Kathmandu")

    # 1️⃣ Get latest measured data
    measured = await db.airquality.find_first(
        order={"measuredAt": "desc"}
    )

    # 2️⃣ Get latest predicted data
    predicted = await db.airqualityprediction.find_first(
        order={"predictedFor": "desc"}
    )

    print("measured", measured)
    print("predicted", predicted)

    # ---- Handle measured ----
    if measured:
        measured.measuredAt = measured.measuredAt.astimezone(nepal_tz)
        measured.createdAt = measured.createdAt.astimezone(nepal_tz)
        # result["measured"] = measured
    else:
        result["measured"] = None

    # ---- Handle predicted ----
    if predicted:
        predicted.predictedFor = predicted.predictedFor.astimezone(nepal_tz)
        predicted.createdAt = predicted.createdAt.astimezone(nepal_tz)
        # result["predicted"] = predicted
    else:
        result["predicted"] = None

    return {
        "today": measured,
        "tomorrow": predicted
        }

async def get_7days_avg_aqi():
    now = datetime.utcnow()
    seven_days_ago = now - timedelta(days=7)
    seven_days_ago_start = seven_days_ago.replace(
    hour=0,
    minute=0,
    second=0,
    microsecond=0
    )       

    measuredAirQuality = await db.airquality.find_many(
        where={
            "measuredAt": {
                "gte": seven_days_ago_start
            }
        },
        order={"measuredAt": "desc"}  # optional, latest first
    )
    predictedAirQuality = await db.airqualityprediction.find_many(
        where={
            "predictedFor": {
                "gte": seven_days_ago_start
            }
        },
        order={"predictedFor": "desc"}  # optional, latest first
    )
    # Store grouped data using real date object
    daily_data = defaultdict(lambda: {
        "measured_values": [],
        "predicted_values": []
    })

    # ---- Group measured 3-hour data ----
    for m in measuredAirQuality:
        date_key = m.measuredAt.date()  # real date (safe for sorting)
        daily_data[date_key]["measured_values"].append(m.us_aqi)

    # ---- Group predicted 3-hour data ----
    for p in predictedAirQuality:
        date_key = p.predictedFor.date()
        daily_data[date_key]["predicted_values"].append(p.us_aqi)

    # ---- Build final response ----
    chart_list = []

    for date_key, values in daily_data.items():
        entry = {
            "date": date_key.strftime("%b %d")  # Format like "Mar 01"
        }

        if values["measured_values"]:
            entry["measuredAQI"] = round(mean(values["measured_values"]))

        if values["predicted_values"]:
            entry["predictedAQI"] = round(mean(values["predicted_values"]))

        chart_list.append(entry)

    # ---- Sort by real date ----
    chart_list.sort(key=lambda x: datetime.strptime(x["date"], "%b %d"))

    return chart_list



async def get_today_aqi():
    nepal_tz = ZoneInfo("Asia/Kathmandu")
    utc_tz = ZoneInfo("UTC")
    # Get current time in Nepal
    now_nepal = datetime.now(nepal_tz)
    # Set to today's 00:00 in Nepal
    today_start_nepal = now_nepal.replace(
    hour=0,
    minute=0,
    second=0,
    microsecond=0
    )

    today_start = today_start_nepal.astimezone(utc_tz)

    measuredAirQuality = await db.airquality.find_many(
        where={
            "measuredAt": {
                "gte": today_start
            }
        },
        order={"measuredAt": "desc"}  # optional, latest first
    )
    predictedAirQuality = await db.airqualityprediction.find_many(
        where={
            "predictedFor": {
                "gte": today_start
            }
        },
        order={"predictedFor": "desc"}  # optional, latest first
    )
     # 🔹 Group by exact 3-hour timestamp
    hourly_data = {}

    # Add measured data
    for m in measuredAirQuality:
        utc_time = m.measuredAt.replace(tzinfo=utc_tz)
        npt_time = utc_time.astimezone(nepal_tz)
        time_str = npt_time.strftime("%H:%M")
        hourly_data[time_str] = {
            "time": time_str,
            "measuredAQI": m.us_aqi
        }

    # Add predicted data
    for p in predictedAirQuality:
        utc_time = p.predictedFor.replace(tzinfo=utc_tz)
        npt_time = utc_time.astimezone(nepal_tz)
        time_str = npt_time.strftime("%H:%M")

        if time_str in hourly_data:
            hourly_data[time_str]["predictedAQI"] = p.us_aqi
        else:
            hourly_data[time_str] = {
                "time": time_str,
                "predictedAQI": p.us_aqi
            }

    # Convert to sorted list
    chart_list = sorted(hourly_data.values(), key=lambda x: x["time"])

    return chart_list



async def get_saved_metrics():
    metrics = await db.modelmetrics.find_first(
        order={"createdAt": "desc"}
    )
    return metrics
