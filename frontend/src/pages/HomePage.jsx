import HeroAQI from "../components/sections/HeroAQI";
import HeroSection from "../components/sections/HeroSection";
import KeyFeatures from "../components/sections/KeyFeatures";
import HowItWorks from "../components/sections/HowItWorks";
import ModelMetrics from "../components/sections/ModelMetrics";
import CTASection from "../components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroAQI />
      <HeroSection />
      <KeyFeatures />
      <HowItWorks />
      <ModelMetrics />
      <CTASection />
    </>
  );
}
