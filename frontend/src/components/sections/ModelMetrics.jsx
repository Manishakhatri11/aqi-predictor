// import { METRICS } from "../../data/heroMetrics";
import { useEffect, useState } from "react";
import { Trophy, Crosshair, Target } from "lucide-react";
import { FaRandom } from "react-icons/fa";
import { fetchLatestMetrics } from "../../data/aqiApi";

const MetricCard = ({ Icon, value, label }) => (
  <div className="rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-8 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
    <div className="flex justify-center">
      <Icon className="h-10 w-10 text-teal-300" />
    </div>
    <div className="mt-6 text-4xl font-bold text-white">{value}</div>
    <p className="mt-3 text-sm text-gray-300">{label}</p>
  </div>
);

export default function ModelMetrics() {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchLatestMetrics();
        console.log(data);
        setMetrics(data);
      } catch (error) {
        console.error("Failed to load metrics:", error);
      }
    };

    loadMetrics();
  }, []);

  if (!metrics) {
    return (
      <section className="py-20 text-center text-white">
        Loading metrics...
      </section>
    );
  }

  const formattedMetrics = [
    {
      icon: Trophy,
      value: `${(metrics.r2Score * 100).toFixed(3)}%`,
      label: "Model Accuracy (R² Score)",
    },
    {
      icon: Crosshair,
      value: metrics.rmse.toFixed(3),
      label: "RMSE Score",
    },
    {
      icon: Target,
      value: metrics.mae.toFixed(3),
      label: "MAE Score",
    },
    {
      icon: FaRandom,
      value: metrics.crossValidation.toFixed(3),
      label: "Cross-Validation",
    },
  ];
  return (
    <section className="w-full bg-gradient-to-br from-[#243b55] to-[#141e30] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {formattedMetrics.map((item, index) => (
            <MetricCard
              key={index}
              Icon={item.icon}
              value={item.value}
              label={item.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
