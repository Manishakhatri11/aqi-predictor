import FeatureCard from "../cards/FeatureCard";
import { KEY_FEATURES } from "../../data/keyFeatures";

export default function KeyFeatures() {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">
            Key Features
          </h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-teal-400" />
        </div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {KEY_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}