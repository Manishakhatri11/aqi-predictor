import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchAQI = async () => {
  const response = await api.get("aqi");
  return response.data;
};

export const fetchPM25 = async (payload) => {
  const response = await api.post("predict/ml/pm25", payload);
  return response.data;
};

export const fetchLast7days = async () => {
  const response = await api.get("aqi/last7days");
  return response.data;
};

export const fetchTodayData = async () => {
  const response = await api.get("aqi/today");
  return response.data;
};

export const fetchLatestMetrics = async () => {
  const response = await api.post("aqi/metrics");
  return response.data;
};