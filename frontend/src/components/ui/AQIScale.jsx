import {getAQIClasses} from "../../data/aqiUtils"

export default function AQIScale({ aqi }) {
    const maxAQI = 300; // Standard US AQI max
    const indicator = `${Math.min((aqi / maxAQI) * 100, 100)}%`;
    const { bg, text, badgeBg } = getAQIClasses(aqi);
  return (
    <>
      <div className={`flex justify-between text-sm font-semibold ${text}`}>
        {["Good", "Moderate", "USG", "Unhealthy", "Very Unhealthy", "Hazardous"].map(l => (
          <span key={l}>{l}</span>
        ))}
      </div>

      <div className="relative mt-3 h-3 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 via-orange-400 via-red-500 to-purple-700">
        <span
          className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full ${bg} border-4 border-white-500`}
          style={{ left: indicator }}
        />
      </div>

      <div className={`flex justify-between text-xs ${text} mt-2`}>
        {["0", "50", "100", "150", "200", "300+"].map(v => (
          <span key={v}>{v}</span>
        ))}
      </div>
    </>
  );
}