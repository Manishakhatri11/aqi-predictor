export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
        {title}
      </h2>
      <div className="mx-auto mt-3 h-1 w-20 rounded bg-teal-400" />
      {subtitle && (
        <p className="mt-4 text-slate-500 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}