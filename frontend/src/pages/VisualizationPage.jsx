import AboutHeader from "../components/sections/AboutHeader";
import WhatIsProject from "../components/sections/WhatIsProject";
import MachineLearningModel from "../components/sections/MachineLearningModel";
import TechnologyStack from "../components/sections/TechnologyStack";
import AQICategories from "../components/aqi/AQICategories";
import AQIHistoryChart from "../components/sections/AQIHistoryChart";
import AQITodayChart from "../components/sections/AQITodayChart";
export default function VisualizationPage() {
  return (
    <>
      <AboutHeader
        title="Data Visualization"
        subtitle="Interactive Charts and analytics for Air Quality Information"
      />
      <AQIHistoryChart />
      <AQITodayChart />
    </>
  );
}
