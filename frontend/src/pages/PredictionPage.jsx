import AboutHeader from "../components/sections/AboutHeader";
import WhatIsProject from "../components/sections/WhatIsProject";
import MachineLearningModel from "../components/sections/MachineLearningModel";
import TechnologyStack from "../components/sections/TechnologyStack";
import AQICategories from "../components/aqi/AQICategories";
import AirQualityPredictor from "../components/sections/AirQualityPredictor";
export default function PredictionPage() {
  return (
    <>
      <AboutHeader title = "PM2.5 Prediction" subtitle = "Get AI-powered air quality predictions instantly" />
      <AirQualityPredictor />

    </>
  );
}