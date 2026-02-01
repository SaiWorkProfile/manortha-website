/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "manortha-black": "#0a0a0a",
        "manortha-gold": "#d4af37",
        "manortha-sunset": "#ff8c42"
      }
    },
  },
  plugins: [],
}
