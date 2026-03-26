import AboutHeader from "../components/sections/AboutHeader";
import WhatIsProject from "../components/sections/WhatIsProject";
import MachineLearningModel from "../components/sections/MachineLearningModel";
import TechnologyStack from "../components/sections/TechnologyStack";
import AQICategories from "../components/aqi/AQICategories";

export default function AboutPage() {
  return (
    <>
      <AboutHeader title = "About This Project" subtitle = "Understanding Air Quality Prediction with Machine Learning" />
      <WhatIsProject />
      <MachineLearningModel />
      <TechnologyStack />
      <AQICategories />
    </>
  );
}