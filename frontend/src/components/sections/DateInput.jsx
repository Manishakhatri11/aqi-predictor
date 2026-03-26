import React from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";

export function DateInput({ selectedDate, onChange }) {
  return (
    <div className="mb-4">
      <label className="flex items-center font-semibold text-gray-800 mb-2">
        <FaCalendarAlt className="mr-2 text-teal-500" />
        Select Date
      </label>

      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        dateFormat="yyyy-MM-dd"
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
        placeholderText="Select a date"
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
      />
    </div>
  );
}
