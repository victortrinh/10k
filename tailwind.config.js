/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        background: "rgb(17 24 39)",
      },
    },
  },
  plugins: [],
};
