/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./viewcart.js",
    "./index.html",
    "./cart.html",
    "./Admin-panel/admin.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/public/pattern_h.png')",
      },
    },
  },
  plugins: [],
};
