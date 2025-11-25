/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'], // ← added to fix font-outfit
      },
      keyframes: {
        "gradient-move": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" }
        }
      },
      animation: {
        "gradient-move": "gradient-move 5s ease infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite"
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),      // ← add forms plugin
    require('@tailwindcss/typography')  // ← add typography plugin
  ],
};
