/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      logo: ["Poetsen One", "sans-serif"],
      word: ["Briem Hand", "sans-serif"],
    },
    extend: {},
  },
  variants: {
    display: ["group-hover"],
  },
  plugins: [],
};
