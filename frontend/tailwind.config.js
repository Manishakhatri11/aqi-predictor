export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        brand: "#0B5697",
        accent: "#4de0f2",
        brand_dark: "linear-gradient(135deg, #1b2735 0%, #214e75 50%, #367ab1 100%)",
        aqi: {
          good: "#d4f7a3",           // light green background
          goodText: "#065f00",       // dark green text

          moderate: "#fff9a3",       // light yellow bg
          moderateText: "#735f00",   // dark yellow text

          usg: "#ffddb3",            // light orange
          usgText: "#804000",        // dark orange

          unhealthy: "#ffb3b3",      // light red
          unhealthyText: "#7f0d0d",  // dark red

          veryunhealthy: "#e0c3ff",  // light purple
          veryunhealthyText: "#3f0080", // dark purple

          hazardous: "#7f1d1d",      // dark maroon bg
          hazardousText: "#fdf3f3",  // light text for contrast
        },

      },
      backgroundImage: {
        "brand-dark": "linear-gradient(135deg, #1b2735 0%, #214e75 50%, #367ab1 100%)",
      },
    },
  },
  plugins: [],
};