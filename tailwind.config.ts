import type { Config } from "tailwindcss";

// Sistema visual "Greca" (ver /diseno/03-greca)
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#FED700",
        // Cacao: fondos
        ink: {
          DEFAULT: "#1a110d",
          900: "#130c09",
          800: "#251914",
          700: "#30211a",
          600: "#3d2b21",
        },
        // Hueso de amate: textos
        bone: {
          DEFAULT: "#f6ebdd",
          200: "#e4d6c5",
          300: "#c9b8a6",
          400: "#a8947f",
        },
        mint: { DEFAULT: "#98EFDC", dark: "#6FD6BF" },
        gold: { DEFAULT: "#f2a93b", dark: "#d98f1f" }, // cempasúchil
        chile: "#ee6a4c",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        // Greca usa solo dos familias: "mono" cae a la sans para no cargar una tercera
        mono: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        draw: { to: { strokeDashoffset: "0" } },
        pulseDot: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.3" } },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out both",
        draw: "draw 1.4s ease-out 0.3s forwards",
        pulseDot: "pulseDot 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms"), require("daisyui")],
};
export default config;
