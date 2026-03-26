import React, { useState } from "react";
import { FaCloud, FaWind, FaIndustry, FaSmog } from "react-icons/fa";
import { GiChemicalDrop } from "react-icons/gi";
import { PollutantInput } from "./PollutantInput";
import { PredictionDisplay } from "./PredictionDisplay";
import { DateInput } from "./DateInput";
import { fetchPM25 } from "../../data/aqiApi";

export default function AirQualityPredictor() {
  const [so2, setSO2] = useState("");
  const [no2, setNO2] = useState("");
  const [co, setCO] = useState("");
  const [o3, setO3] = useState("");
  const [pm10, setPM10] = useState("");

  const [prediction, setPrediction] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    setLoading(true);
    setError(null);

    const date = selectedDate;

    const payload = {
      no2: parseFloat(no2) || 0,
      so2: parseFloat(so2) || 0,
      o3: parseFloat(o3) || 0, // spm input is O3
      co: parseFloat(co) || 0, // rspm input is CO
      hour: date.getHours(),
      day: date.getDate(),
      month: date.getMonth() + 1, // JS months 0–11
      day_of_week: date.getDay(), // 0=Sunday, 1=Monday
      is_weekend: [0, 6].includes(date.getDay()) ? 1 : 0,
      pm10: parseFloat(pm10) || 0,
    };
    try {
      const data = await fetchPM25(payload);
      setPrediction(data.pm25);
    } catch (err) {
      console.error(err);
      setError("Failed to Predict PM2.5 data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row gap-6 p-6 items-start">
      {/* Input Form */}
      <div className="flex-1 bg-white p-6 rounded shadow-md">
        {/* <div className="w-full md:w-2/5 bg-white p-6 rounded shadow-md"> */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaCloud className="mr-2 text-teal-500" /> Input Parameters
        </h2>
        <p className="text-gray-500 mb-4">
          Enter pollutant values to predict PM2.5 levels
        </p>

        <PollutantInput
          label="SO2 (Sulfur Dioxide)"
          icon={<FaSmog />}
          unit="µg/m³"
          value={so2}
          onChange={(e) => {
            setSO2(e.target.value);
            setPrediction(null);
          }}
          placeholder="e.g., 10.0"
          min={0}
          max={50}
        />
        <PollutantInput
          label="NO2 (Nitrogen Dioxide)"
          icon={<FaWind />}
          unit="µg/m³"
          value={no2}
          onChange={(e) => {
            setNO2(e.target.value);
            setPrediction(null);
          }}
          placeholder="e.g., 10.0"
          min={0}
          max={80}
        />
        <PollutantInput
          label="CO (Carbon Monoxide)"
          icon={<GiChemicalDrop />}
          unit="µg/m³"
          value={co}
          onChange={(e) => {
            setCO(e.target.value);
            setPrediction(null);
          }}
          placeholder="e.g., 10.0"
          min={0}
          max={300}
        />
        <PollutantInput
          label="O3 (Ozone)"
          icon={<FaCloud />}
          unit="µg/m³"
          value={o3}
          onChange={(e) => {
            setO3(e.target.value);
            setPrediction(null);
          }}
          placeholder="e.g., 180.0"
          min={0}
          max={500}
        />
        <PollutantInput
          label="PM10"
          icon={<FaCloud />}
          unit="µg/m³"
          value={pm10}
          onChange={(e) => {
            setPM10(e.target.value);
            setPrediction(null);
          }}
          placeholder="e.g., 44.1"
          min={0}
          max={500}
        />
        <DateInput
          selectedDate={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setPrediction(null);
          }}
        />

        <button
          onClick={handlePredict}
          className="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 rounded transition"
        >
          Predict PM2.5 Level
        </button>
      </div>
      <PredictionDisplay
        className="bg-white p-4 rounded shadow-lg"
        prediction={prediction}
        so2={so2}
        no2={no2}
        co={co}
        o3={o3}
        selectedDate={selectedDate}
        areaType="Kathmandu"
      />
    </div>
  );
}
