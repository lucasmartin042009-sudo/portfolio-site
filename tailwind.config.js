/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Playfair Display'", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#c4a35a",
          light:   "#d4b36a",
          dim:     "rgba(196,163,90,0.15)",
          glow:    "rgba(196,163,90,0.25)",
        },
      },
    },
  },
  plugins: [],
};
