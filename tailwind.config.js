/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#2a2d3e',
        darkSurface: '#303346',
        primary: '#f05252',
        primaryHover: '#e04040',
        danger: '#ef4444',
        outlineOrange: '#f58442',
        outlineOrangeHover: '#fff3ed',
      }
    },
  },
  plugins: [],
}
