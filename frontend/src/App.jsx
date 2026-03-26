import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PredictionPage from "./pages/PredictionPage";
import VisualizationPage from "./pages/VisualizationPage";

//import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <BrowserRouter>
     
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/visualization" element={<VisualizationPage />} />

      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;