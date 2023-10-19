/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#fadada",
          200: "#f6b5b5",
          300: "#f18f8f",
          400: "#ed6a6a",
          500: "#e84545",
          600: "#ba3737",
          700: "#8b2929",
          800: "#5d1c1c",
          900: "#2e0e0e"
        },
        dark: {
          100: "#d1d2d3",
          200: "#a3a5a7",
          300: "#74787c",
          400: "#464b50",
          500: "#181e24",
          600: "#13181d",
          700: "#0e1216",
          800: "#0a0c0e",
          900: "#050607"
        }
      },
    },
  },
  plugins: [
    require('@mertasan/tailwindcss-variables'),
  ],
};
