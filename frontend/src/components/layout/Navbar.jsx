import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/aqiLogo.png";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-brand-dark text-white fixed top-0 z-50">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="AQI Predictor Logo" className="h-8 w-8" />
            <span className="text-xl font-bold">AQI Predictor</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 mr-9">
            <Link to="/" className="hover:text-accent">Home</Link>
            <Link to="/prediction" className="hover:text-accent">Prediction</Link>
            <Link to="/visualization" className="hover:text-accent">Visualization</Link>
            <Link to="/about" className="hover:text-accent">About</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="space-y-2 px-4 py-3">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/prediction" onClick={() => setIsOpen(false)}>Prediction</Link>
            <Link to="/visualization" onClick={() => setIsOpen(false)}>Visualization</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
          </div>
        </div>
      )}
    </nav>
  );
}