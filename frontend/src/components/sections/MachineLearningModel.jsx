import { FaRobot, FaChartLine, FaLayerGroup } from "react-icons/fa";
import { useEffect, useState } from "react";
import { fetchLatestMetrics } from "../../data/aqiApi";

const Card = ({ icon: Icon, title, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-3 rounded-xl bg-teal-100 text-teal-600">
        <Icon size={22} />
      </div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="text-sm text-slate-600 leading-relaxed">{children}</div>
  </div>
);

export default function MachineLearningModel() {
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

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-800">
            Machine Learning Model
          </h2>
          <div className="w-16 h-1 bg-teal-400 mx-auto mt-3 rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Algorithm */}
          <Card icon={FaRobot} title="Algorithm">
            <p className="font-semibold text-slate-700 mb-2">
              Random Forest Regressor
            </p>
            <p>
              An ensemble learning method that operates by constructing multiple
              decision trees during training.
            </p>
          </Card>

          {/* Performance */}
          <Card icon={FaChartLine} title="Performance">
            <ul className="space-y-2">
              <li>
                <strong>R² Score:</strong> {(metrics?.r2Score * 100).toFixed(3)}
                %
              </li>
              <li>
                <strong>RMSE:</strong> {metrics?.rmse.toFixed(3)}
              </li>
              <li>
                <strong>MAE:</strong> {metrics?.mae.toFixed(3)}
              </li>
              <li>
                <strong>Cross-Validation:</strong>{" "}
                {metrics?.crossValidation.toFixed(3)}
              </li>
            </ul>
          </Card>

          {/* Features */}
          <Card icon={FaLayerGroup} title="Features Used">
            <ul className="space-y-2">
              <li>SO₂, NO₂, RSPM, SPM</li>
              <li>Year, Month</li>
              <li>State, Area Type</li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  );
}
