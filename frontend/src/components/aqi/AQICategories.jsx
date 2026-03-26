import Section from "../layout/Section";
import SectionHeader from "../ui/SectionHeader";
import { AQI_CATEGORIES } from "../../data/aqiCategories";

export default function AQICategories() {
  return (
    <Section className="bg-white">
      <SectionHeader title="Air Quality Index (AQI) Categories" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {AQI_CATEGORIES.map(item => (
          <div
            key={item.title}
            className={`rounded-2xl p-8 text-white shadow-lg bg-gradient-to-br ${item.bg}`}
          >
            <h3 className="text-2xl font-bold mb-3">
              {item.title} ({item.range})
            </h3>
            <p className="text-sm opacity-90">{item.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}