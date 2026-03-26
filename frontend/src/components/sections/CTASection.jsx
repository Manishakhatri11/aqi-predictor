import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="w-full bg-gradient-to-r from-[#78cfc5] to-[#5fb3a2] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center text-white">

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Predict Air Quality?
        </h2>

        {/* Subtitle */}
        <p className="mt-4 text-lg text-white/90">
          Get instant PM2.5 predictions with our AI-powered system
        </p>

        {/* Button */}
        <div className="mt-10">
          <Link
            to="/prediction"
            className="inline-block rounded-full bg-[#8be0d7] px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-[#7ad3c9] hover:scale-105"
          >
            Start Predicting Now
          </Link>
        </div>

      </div>
    </section>
  );
}