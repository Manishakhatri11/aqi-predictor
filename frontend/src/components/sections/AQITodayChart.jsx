import React, { useEffect, useState } from "react";
import { fetchTodayData } from "../../data/aqiApi";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AQITodayChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTodayData();

        const chartData = response.map((item) => ({
          time: item.time,
          measured: item.measuredAQI || null,
          predicted: item.predictedAQI || null,
        }));

        setData(chartData);
      } catch (error) {
        console.error("Error fetching today's AQI:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-8 rounded-xl shadow-md mx-auto max-w-7xl mt-10">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Today’s AQI</h2>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="measuredColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1E40AF" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#1E40AF" stopOpacity={0} />
            </linearGradient>

            <linearGradient id="predictedColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis label={{ value: "AQI", angle: -90, position: "insideLeft" }} />

          <Tooltip
            contentStyle={{
              borderRadius: "10px",
              border: "none",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
            }}
          />

          <Legend verticalAlign="top" height={36} />

          <Area
            type="monotone"
            dataKey="measured"
            stroke="#1E40AF"
            fill="url(#measuredColor)"
            strokeWidth={3}
            name="Measured AQI"
          />

          <Area
            type="monotone"
            dataKey="predicted"
            stroke="#10B981"
            fill="url(#predictedColor)"
            strokeWidth={3}
            name="Predicted AQI"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
