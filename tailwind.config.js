/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: "#fff",
      background: "#F3F5F9",
      primary: "#4270F9",
      secondary: "#E1E4EC",
      succes: "#3EBF5B",
      danger: "#F85454",
      mainText: "#4D5568",
      secondaryText: "#7682A0",
    },
    fontFamily: {
      AlbertSans: ["Albert Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
