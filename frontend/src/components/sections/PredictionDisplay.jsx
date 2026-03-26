import React from "react";
import {
  FaChartLine,
  FaHeartbeat,
  FaInfoCircle,
  FaChartPie,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

export function PredictionDisplay({
  prediction,
  so2,
  no2,
  co,
  o3,
  selectedDate,
}) {
  // --- RESTORED FUNCTION ---
  const getAQIStatus = (value) => {
    const pm = parseFloat(value);
    if (pm <= 30)
      return {
        label: "GOOD",
        color: "bg-green-500",
        message:
          "Air quality is considered satisfactory, and air pollution poses little or no risk.",
      };
    if (pm <= 60)
      return {
        label: "SATISFACTORY",
        color: "bg-yellow-400 text-black",
        message:
          "Air quality is acceptable. However, there may be a risk for some people.",
      };
    if (pm <= 90)
      return {
        label: "MODERATE",
        color: "bg-orange-400",
        message: "Members of sensitive groups may experience health effects.",
      };
    return {
      label: "POOR",
      color: "bg-red-500",
      message:
        "Health alert: The risk of health effects is increased for everyone.",
    };
  };
  // Chart Data Mapping
  const chartData = [
    { name: "SO2", value: parseFloat(so2) || 0, color: "#f87171" },
    { name: "NO2", value: parseFloat(no2) || 0, color: "#99f6e4" },
    { name: "CO", value: parseFloat(co) || 0, color: "#7dd3fc" },
    { name: "o3", value: parseFloat(o3) || 0, color: "#fb923c" },
    {
      name: "PM2.5 (Predicted)",
      value: parseFloat(prediction) || 200,
      color: "#bbf7d0",
    },
  ];

  if (!prediction) {
    return (
      <div className="flex-1 bg-white p-6 rounded shadow-md flex flex-col justify-center items-center text-gray-400">
        <FaChartLine className="text-4xl mb-2" />
        <p className="text-xl font-semibold mb-2">No Predictions Yet</p>
        <p>
          Fill out the form and click "Predict PM2.5 Level" to see results here.
        </p>
      </div>
    );
  }

  const status = getAQIStatus(prediction);

  const formattedDate = selectedDate
    ? new Date(selectedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "N/A";

  return (
    <div className="bg-white p-6 ">
      {/* Prediction Card */}
      <div className="bg-brand-dark text-white rounded-2xl shadow-xl p-8 mb-6 text-center">
        <p className="text-lg opacity-80 mb-2">Predicted PM2.5</p>
        <h1 className="text-6xl font-bold mb-2">{prediction}</h1>
        <p className="text-xl mb-6">µg/m³</p>
        <div
          className={`inline-block px-8 py-2 rounded-full font-bold text-lg shadow-lg ${status.color}`}
        >
          {status.label}
        </div>
      </div>

      {/* Health Impact */}
      <div className="bg-white rounded-xl shadow-md p-6  mb-6 border-l-4 border-teal-500">
        <div className="flex items-center mb-3">
          <FaHeartbeat className="text-teal-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Health Impact</h3>
        </div>
        <p className="text-gray-600 leading-relaxed">{status.message}</p>
      </div>

      {/* Input Summary */}
      <div className="bg-gray-50 rounded-xl p-6  mb-6 border border-gray-100">
        <div className="flex items-center mb-4">
          <FaInfoCircle className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">Input Summary</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <SummaryItem label="SO2" value={`${so2} µg/m³`} />
          <SummaryItem label="NO2" value={`${no2} µg/m³`} />
          <SummaryItem label="CO" value={`${co} µg/m³`} />
          <SummaryItem label="O3" value={`${o3} µg/m³`} />
          <SummaryItem label="Date" value={formattedDate} />
          <SummaryItem label="Location" value="Kathmandu" />
        </div>
      </div>

      {/* Doughnut Chart */}
      <div className="bg-gray-50 rounded-xl shadow-md p-6">
        <div className="flex items-center mb-4">
          <FaChartPie className="text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">
            Pollutant Composition
          </h3>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={35}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    cursor="pointer"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center space-x-2">
              <div
                className="w-6 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs font-semibold text-gray-500">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value }) {
  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-50">
      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
        {label}
      </p>
      <p className="text-sm font-bold text-gray-700">{value}</p>
    </div>
  );
}
