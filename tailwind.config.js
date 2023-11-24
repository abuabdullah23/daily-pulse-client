/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: 'class',
  
  theme: {
    extend: {
      colors: {
        bodyColor: "var(--body)",
        secondaryColor: "var(--secondary)",
        primaryColor: "var(--primary)",
        blackColor: "var(--black)",
        buttonColor: "var(--button)",
        primaryTextColor: "var(--primary-text)",
      }
    },
  },
  plugins: [],
}