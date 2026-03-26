export const aqiClasses = {
  good: { bg: "bg-aqi-good/70", text: "text-aqi-goodText", badgeBg: "bg-aqi-good" },
  moderate: { bg: "bg-aqi-moderate/70", text: "text-aqi-moderateText", badgeBg: "bg-aqi-moderate" },
  usg: { bg: "bg-aqi-usg/70", text: "text-aqi-usgText", badgeBg: "bg-aqi-usg" },
  unhealthy: { bg: "bg-aqi-unhealthy/70", text: "text-aqi-unhealthyText", badgeBg: "bg-aqi-unhealthy" },
  veryunhealthy: { bg: "bg-aqi-veryunhealthy/70", text: "text-aqi-veryunhealthyText", badgeBg: "bg-aqi-veryunhealthy" },
  hazardous: { bg: "bg-aqi-hazardous/70", text: "text-aqi-hazardousText", badgeBg: "bg-aqi-hazardous" },
};

export function getAQICategory(aqi) {
  if (aqi <= 50) return "good";
  if (aqi <= 100) return "moderate";
  if (aqi <= 150) return "usg";
  if (aqi <= 200) return "unhealthy";
  if (aqi <= 300) return "veryunhealthy";
  return "hazardous";
}


export function getAQIClasses(aqi) {
  const category = getAQICategory(aqi);
  return aqiClasses[category];
}