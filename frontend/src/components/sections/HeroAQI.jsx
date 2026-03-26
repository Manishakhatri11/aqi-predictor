import { useEffect, useState } from "react";
import Section from "../layout/Section";
import AQICard from "../aqi/AQICard";
import { fetchAQI } from "../../data/aqiApi";

export default function HeroAQI() {
  const [aqiDataToday, setAqiDataToday] = useState(null);
  const [aqiDataTomorrow, setAqiDataTomorrow] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAQI();
        setAqiDataToday(data.today);
        setAqiDataTomorrow(data.tomorrow);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch AQI data.");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);
  if (loading) {
    return (
      <Section className="bg-gradient-to-b from-yellow-50 to-yellow-100">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">
          Kathmandu Air Quality Index (AQI)
        </h1>
        <p className="mt-8 text-lg text-gray-600">Loading data...</p>
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="bg-gradient-to-b from-yellow-50 to-yellow-100">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">
          Kathmandu Air Quality Index (AQI)
        </h1>
        <p className="mt-8 text-lg text-red-500">{error}</p>
      </Section>
    );
  }

  return (
    <Section className="bg-gradient-to-b from-yellow-50 to-yellow-100">
      <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">
        Kathmandu Air Quality Index (AQI)
      </h1>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <AQICard
          title="Today's AQI"
          aqi={aqiDataToday.us_aqi}
          status={getAQIStatus(aqiDataToday.us_aqi)}
          pm10={aqiDataToday.pm10}
          pm25={aqiDataToday.pm2_5}
        />
        {/* If you have forecast data for tomorrow, replace with actual */}
        <AQICard
          title="Tomorrow's Predicted AQI"
          aqi={aqiDataTomorrow.us_aqi} // Example: adjust dynamically if forecast available
          status={getAQIStatus(aqiDataTomorrow.us_aqi)}
          pm10={aqiDataTomorrow.pm10}
          pm25={aqiDataTomorrow.pm2_5}
        />
      </div>
    </Section>
  );
}
function getAQIStatus(aqi) {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}
