import { STEPS } from "../../data/howItWorks";

function StepCard({ step, title, desc }) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Step Circle */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4b6b8a] text-xl font-bold text-white">
        {step}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="w-full py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <div className="mx-auto mt-3 h-1 w-20 rounded bg-teal-400" />
        </div>

        {/* Steps */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step) => (
            <StepCard
              key={step.step}
              step={step.step}
              title={step.title}
              desc={step.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
