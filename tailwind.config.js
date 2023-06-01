/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Manrope", "sans-serif"],
      },
      colors: {
        "blue-1000": "#121F3E",
        "blue-1100": "#3454D1",
        "blue-1200": "#EBEEFA",
        "blue-1300": "#F8FAFB",
        "blue-1400": "#F4F6F7",
        "blue-1500": "#D5E1FB",
        "gray-1000": "#7E7E7E",
        "gray-1100": "#474554",
      }
    },
  },
  plugins: [],
}