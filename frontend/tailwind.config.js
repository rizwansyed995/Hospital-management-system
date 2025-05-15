/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./frontend/src/**/*.{js,jsx,ts,tsx}", // or adjust based on actual folder structure
  ],

  theme: {
    extend: {
      colors: {
        bgSoft: "#FBFBFB",      // Base background
        cardLight: "#E8F9FF",   // For cards and soft sections
        primary: "#C4D9FF",     // Main button color
        accent: "#C5BAFF",      // Secondary highlights
        text: "#1F2937",        // Dark gray text (Tailwind's gray-800)
      },
      gridTemplateColumns: {
        auto: "repeat(auto-fill, minmax(200px, 1fr))",
      },
    },
  },
  plugins: [],
};
