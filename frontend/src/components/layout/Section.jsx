export default function Section({ children, className = "" }) {
  return (
    <section className={`w-full py-20 ${className}`}>
      <div className="mx-auto max-w-7xl px-6">
        {children}
      </div>
    </section>
  );
}