/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "ring-red-200",
    "ring-orange-200",
    "ring-lime-200",
    "ring-indigo-200",
    "ring-purple-200",
    "ring-pink-200",
    "ring-rose-200",
    "ring-cyan-200",
    "ring-teal-200",
    "ring-amber-200",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        background: "rgb(17 24 39)",
      },
    },
  },
  plugins: [],
};
