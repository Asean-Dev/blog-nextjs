/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./modules/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#243831",
        secondary: "#2B5F44",
        info: "#D8E9E4",
        golden: "#C5A365",
        textColor: "#191919",
        success: "#49A569",
        graySoft: "#BBC2C0",
        grayMedium: "#939494",
      },
    },
  },
  plugins: [],
};
