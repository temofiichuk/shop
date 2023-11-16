import type { Config } from "tailwindcss";

const colors = {
  transparent: "transparent",

  bg_dark: "#373854",
  txt_dark: "#F3F3F3",
  txt_passive_dark: "#E1E1E1",

  bg_light: "#FAFAFA",
  txt_light: "#292929",
  txt_passive_light: "#808191",

  white: "#FFFFFF",
  black: "#000000",

  primary: "#475BE8",

  profit: "#475BE8",
  loss: "#E3E7FC",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {},
    extend: {
      fontSize: {
        "xs": "0.82rem",
        "sm": "0.98rem",
        "base": "1.15rem",
        "lg": "1.22rem",
        "xl": "1.36rem",
        "1.5xl": "1.5rem",
        "2xl": "1.725rem",
        "3xl": "2.155rem",
        "4xl": "2.58rem",
        "5xl": "3.45 rem",
        "6xl": "4.3rem",
        "7xl": "5.17 rem",
        "8xl": "6.9rem",
        "9xl": "9.2rem",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "50%": { transform: "scale(0)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        scaleIn: "scaleIn 0.35s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
