/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Makor brand tokens — available as Tailwind classes
        // (the platform itself uses inline styles, but these are here
        // for any future pages or future Tailwind-based extensions)
        makor: {
          purple: "#413277",
          "purple-deep": "#2D2256",
          "purple-night": "#1F1842",
          "purple-mid": "#5A4992",
          "purple-soft": "#7E6FB1",
          "purple-mist": "#B5ABCE",
          "purple-fog": "#E5E0EE",
          cream: "#F1EEE7",
          "cream-soft": "#F7F5EE",
          paper: "#FBF9F4",
          ink: "#1A1532",
          green: "#3D6647",
          red: "#963838",
          amber: "#9C6B1A",
        },
      },
      fontFamily: {
        serif: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};
