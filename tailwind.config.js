/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Azul índigo
        secondary: "#10B981", // Verde esmeralda
        background: "#1F2937", // Cinza escuro
        text: "#F9FAFB", // Branco
        highlight: "#D1D5DB", // Cinza claro
        "primary-dark": "#4338CA",
        "secondary-dark": "#0F766E",
      },
    },
  },
  plugins: [],
};
