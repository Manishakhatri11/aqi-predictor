import React from "react";

export function PollutantInput({ label, icon, unit, value, onChange, placeholder, min, max }) {
  return (
    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-1">
        {icon && <span className="mr-2 text-teal-500">{icon}</span>}
        {label}
        {unit && <span className="ml-1 text-gray-400 text-sm">{unit}</span>}
      </label>
      <input
        type="number"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
      />
      {min !== undefined && max !== undefined && (
        <p className="text-xs text-gray-400 mt-1">
          Typical range: {min}-{max} {unit}
        </p>
      )}
    </div>
  );
}