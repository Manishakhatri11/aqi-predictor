import AQIScale from "../ui/AQIScale";
import {getAQIClasses} from "../../data/aqiUtils"

export default function AQICard({
  title,
  aqi,
  status,
  pm10,
  pm25,
}) {
  const { bg, text, badgeBg } = getAQIClasses(aqi);
  return (
    <div className={`rounded-3xl ${bg} p-8 shadow-lg`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className={`text-sm font-semibold ${text}`}>{title}</p>
          <h2 className={`text-6xl font-bold  ${text} mt-2`}>
            {aqi}
            <span className={`text-base ml-2  ${text}`}>(AQI US)</span>
          </h2>
        </div>

        <div className={`px-6 py-3 rounded-xl font-bold ${text} shadow-lg ${badgeBg}`}>
          {status}
        </div>
      </div>

      <div className={`flex justify-between mb-6 font-semibold ${text}`}>
        <p>PM10: {pm10} µg/m³</p>
        <p>PM2.5: {pm25} µg/m³</p>
      </div>

      <AQIScale aqi= {aqi} />
    </div>
  );
}
