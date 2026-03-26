export default function AboutHeader({
  title,
  subtitle
}) {
  return (
    <header className="w-full bg-brand-dark py-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        <p className="text-lg md:text-xl text-white/80">{subtitle}</p>
      </div>
    </header>
  );
}