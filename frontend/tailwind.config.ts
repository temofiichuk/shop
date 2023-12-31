import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

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
    // colors: {},
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
        fadeLeftIn: {
          "0%": { opacity: "0", transform: "translate(100%, 100px)" },
          "100%": { opacity: "1", transform: "translate(0,0)" },
        },
        fadeRightIn: {
          "0%": { opacity: "0", transform: "translate(-100%, -100%)" },
          "100%": { opacity: "1", transform: "translate(0,0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        changeAndShow: {
          "0%": { transform: "translate(0, 0)", opacity: "0", zIndex: "0" },
          "50%": { transform: "translate(50px, 50px)" },
          "100%": { transform: "translate(0, 0)", opacity: "1", zIndex: "10" },
        },
        changeAndHide: {
          "0%": { transform: "translate(0, 0)", opacity: "1", zIndex: "10" },
          "50%": { transform: "translate(-50px, -50px)" },
          "100%": {
            transform: "translate(0, 0)",
            opacity: "0",
            zIndex: "0",
            pointerEvents: "none",
          },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeLeftIn: "fadeLeftIn 0.5s ease-in-out",
        fadeRightIn: "fadeRightIn 0.5s ease-in-out",
        changeAndShow: "changeAndShow 0.5s ease-in-out forwards",
        changeAndHide: "changeAndHide 0.5s ease-in-out forwards",
        scaleIn: "scaleIn 0.35s ease-in-out",
      },
    },
  },
  plugins: [forms],
};

export default config;
