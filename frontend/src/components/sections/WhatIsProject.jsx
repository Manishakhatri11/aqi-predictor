import { FaLungs } from "react-icons/fa";

export default function WhatIsProject() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold text-slate-700 mb-6">
              What is This Project?
            </h2>

            <p className="text-slate-600 leading-relaxed mb-5">
              The Air Quality Prediction system is an advanced machine
              learning application designed to forecast PM2.5 (Particulate
              Matter 2.5) levels based on various environmental pollutants.
              This project uses historical air quality data from  Kathmandu city
              to train a Random Forest regression model.
            </p>

            <p className="text-slate-600 leading-relaxed">
              PM2.5 refers to tiny particles in the air that are 2.5 microns
              or less in diameter. These particles can penetrate deep into
              the lungs and even enter the bloodstream, posing serious
              health risks.
            </p>
          </div>

          {/* Right Highlight Card */}
          <div className="bg-gradient-to-br from-teal-400 to-teal-500 text-white rounded-3xl shadow-xl p-10 flex flex-col items-center text-center">
            <FaLungs className="text-6xl mb-6 opacity-90" />
            <h3 className="text-2xl font-semibold mb-3">
              Health Impact
            </h3>
            <p className="text-sm opacity-90">
              PM2.5 monitoring helps protect public health
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
