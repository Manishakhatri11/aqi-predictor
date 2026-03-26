import os
import joblib
import pandas as pd
import numpy as np
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
from sklearn.model_selection import cross_val_score
from prisma import Prisma
from app.services import ml_service

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "../models")
DATA_DIR = os.path.join(BASE_DIR, "../data")



# MODEL_PATH = "models/air_quality_model_v1.pkl"
TRAIN_PATH = os.path.join(DATA_DIR,"training_data.csv")
TEST_PATH = os.path.join(DATA_DIR,"test_data.csv")

FEATURE_COLUMNS = [
    "no2", "so2", "o3", "co",
    "hour", "day", "month",
    "day_of_week", "is_weekend",
    "pm10"
]

TARGET_COLUMNS = ["pm25"]


async def evaluate_and_save():
    # Load model
    model = joblib.load(os.path.join(MODEL_DIR, "air_quality_model_v1.pkl"))

    # Load datasets
    train_df = pd.read_csv(TRAIN_PATH)
    test_df = pd.read_csv(TEST_PATH)

    X_train = train_df[FEATURE_COLUMNS]
    y_train = train_df[TARGET_COLUMNS]

    X_test = test_df[FEATURE_COLUMNS]
    y_test = test_df[TARGET_COLUMNS]

    # Predict
    y_pred = model.predict(X_test)

    # Metrics
    r2 = r2_score(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    mae = mean_absolute_error(y_test, y_pred)
    cv = cross_val_score(model, X_train, y_train, cv=5, scoring="r2").mean()

    # Save to MongoDB
    data={
            "modelName": "PM25_Model_v1",
            "r2Score": float(r2),
            "rmse": float(rmse),
            "mae": float(mae),
            "crossValidation": float(cv),
        }
    result = await ml_service.save_metrics(data)

    return result