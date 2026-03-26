import React, { useEffect, useState } from "react";
import { fetchLast7days } from "../../data/aqiApi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AQIHistoryChart() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchLast7days();
        const chartData = response.map((item) => ({
          date: item.date, // already in "Feb 24" format from backend
          measuredAQI: item.measuredAQI || null,
          predictedAQI: item.predictedAQI || null,
        }));
        setData(chartData);
      } catch (error) {
        console.error("Error fetching AQI data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="bg-white p-8 rounded-xl shadow-md mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Last 7 Days Average
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis label={{ value: "AQI", angle: -90, position: "insideLeft" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="measuredAQI"
            name="Measured AQI"
            stroke="#1E40AF"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
          <Line
            type="monotone"
            dataKey="predictedAQI"
            name="Predicted AQI"
            stroke="#10B981"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
