/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1800px",
        "4xl": "2100px",
      },
      fontFamily: {
        geologica: ["Geologica", "sans-serif"],
        open: ['"Open Sans"', "sans-serif"],
        lora: ["Lora", "serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        manrope : ["Manrope", "sans-serif"],
      },
      colors: {
        menuActiveBg: "#BDC4C3",
        submenuBg: "#DBE5E4",
        submenuBorder: "#CECECE",
        submenuActive: "#DB2629",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
