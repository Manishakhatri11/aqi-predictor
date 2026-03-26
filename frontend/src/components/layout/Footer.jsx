import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";
import logo from "../../assets/aqiLogo.png";

export default function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Visualization", path: "/visualization" },
    { name: "Prediction", path: "/prediction" },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-[#050b2c] to-[#020617] text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">

          {/* Brand */}
          <div>
            <h2 className="flex items-center gap-2 text-2xl font-bold text-white">
              <img src={logo} alt="AQI Predictor Logo" className="h-8 w-8 object-contain" />
              AQI Predictor
            </h2>
            <p className="mt-4 max-w-sm text-gray-400">
              Predicting air quality for a healthier tomorrow using advanced
              machine learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-center gap-2">
                <FaEnvelope /> abc@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> +977-123456789
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-4">
              {[FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-accent hover:text-black"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        © 2025 AQI Predictor. All rights reserved. | Developed by{" "}
        <span className="text-white">ABC</span>
      </div>
    </footer>
  );
}