// src/data/keyFeatures.js
import { Cpu, BarChart3, MapPin, Clock } from "lucide-react";

export const KEY_FEATURES = [
  {
    id: "ai",
    icon: Cpu,
    title: "AI-Powered Predictions",
    desc: "Using Random Forest algorithm with 51.83% accuracy for PM2.5 forecasting",
  },
  {
    id: "charts",
    icon: BarChart3,
    title: "Interactive Visualizations",
    desc: "Explore air quality trends with dynamic charts and graphs",
  },
  {
    id: "map",
    icon: MapPin,
    title: "State-wise Analysis",
    desc: "Compare pollution levels across different Indian states",
  },
  {
    id: "realtime",
    icon: Clock,
    title: "Real-time Results",
    desc: "Get instant predictions with visual health impact indicators",
  },
];