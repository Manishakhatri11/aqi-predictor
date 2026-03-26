export default function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Icon */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-400">
        <Icon className="h-6 w-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold text-gray-800">{title}</h3>

      {/* Description */}
      <p className="mt-4 text-sm leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
}
