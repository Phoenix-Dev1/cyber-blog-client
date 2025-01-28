/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        royalblue: "#4169E1",
        lavilavi: "#CCCCFF",
        lightgray: "#F5F5F5",
        lightgraytwo: "#F5F5F6",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
