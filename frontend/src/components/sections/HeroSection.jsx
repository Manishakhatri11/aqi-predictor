// import { Brain, LineChart, Database } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function HeroSection() {
//   return (
//     <section className="w-full min-h-screen bg-brand-dark text-white flex items-center">
//       <div className="mx-auto max-w-7xl px-6 py-20 text-center">
//         {/* Title */}
//         <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
//           Kathmandu Air Quality Index (AQI) | Air Pollution
//         </h1>

//         <p className="mt-4 text-lg text-gray-300">
//           AI-Powered PM2.5 Level Forecasting for Better Health Decisions
//         </p>

//         {/* Cards */}
//         <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Card 1 */}
//           <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 shadow-lg">
//             <Brain className="mx-auto h-12 w-12 text-teal-300" />
//             <h3 className="mt-6 text-2xl font-semibold">Random Forest</h3>
//             <p className="mt-2 text-gray-300">ML Algorithm</p>
//           </div>

//           {/* Card 2 */}
//           <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 shadow-lg">
//             <LineChart className="mx-auto h-12 w-12 text-teal-300" />
//             <h3 className="mt-6 text-3xl font-bold">51.83%</h3>
//             <p className="mt-2 text-gray-300">R² Score</p>
//           </div>

//           {/* Card 3 */}
//           <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 shadow-lg">
//             <Database className="mx-auto h-12 w-12 text-teal-300" />
//             <h3 className="mt-6 text-2xl font-semibold">Real-time</h3>
//             <p className="mt-2 text-gray-300">Predictions</p>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
//           <Link
//             to="/prediction"
//             className="rounded-full bg-teal-400 px-8 py-3 font-semibold text-black hover:bg-teal-300 transition"
//           >
//             Make Prediction
//           </Link>

//           <Link
//             to="/visualization"
//             className="rounded-full border border-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition"
//           >
//             View Analytics
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// }

import { Brain, LineChart, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchLatestMetrics } from "../../data/aqiApi";

// Reusable Card Component
const Card = ({ Icon, title, subtitle, isMetric }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-lg p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl text-center">
    <Icon className="mx-auto h-12 w-12 text-teal-300" />
    <h3
      className={`mt-6 ${isMetric ? "text-3xl font-bold" : "text-2xl font-semibold"}`}
    >
      {title}
    </h3>
    <p className="mt-2 text-gray-300">{subtitle}</p>
  </div>
);

export default function HeroSection() {
  const [r2, setR2] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchLatestMetrics();
        console.log(data);
        setR2(`${(data.r2Score * 100).toFixed(3)}%`);
      } catch (err) {
        console.error("Failed to fetch metrics:", err);
      }
    };
    loadMetrics();
  }, []);

  const cards = [
    { icon: Brain, title: "Random Forest", subtitle: "ML Algorithm" },
    {
      icon: LineChart,
      title: r2 || "Loading...",
      subtitle: "R² Score",
      isMetric: true,
    },
    { icon: Database, title: "Real-time", subtitle: "Predictions" },
  ];

  return (
    <section className="w-full min-h-screen bg-brand-dark text-white flex items-center">
      <div className="mx-auto max-w-7xl px-6 py-20 text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
          Kathmandu Air Quality Index (AQI) | Air Pollution
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          AI-Powered PM2.5 Level Forecasting for Better Health Decisions
        </p>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <Card
              key={index}
              Icon={card.icon}
              title={card.title}
              subtitle={card.subtitle}
              isMetric={card.isMetric}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-6">
          <Link
            to="/prediction"
            className="rounded-full bg-teal-400 px-8 py-3 font-semibold text-black hover:bg-teal-300 transition"
          >
            Make Prediction
          </Link>
          <Link
            to="/visualization"
            className="rounded-full border border-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition"
          >
            View Analytics
          </Link>
        </div>
      </div>
    </section>
  );
}
