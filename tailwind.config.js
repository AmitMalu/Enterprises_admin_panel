/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geologica: ["Geologica", "sans-serif"],
        open: ['"Open Sans"', "sans-serif"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [],
};
