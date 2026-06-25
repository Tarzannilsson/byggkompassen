import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f4f8",
          100: "#d9e4ef",
          200: "#b3c9e0",
          300: "#7da4c8",
          400: "#4d7daf",
          500: "#2d5f91",
          600: "#1e4a78",
          700: "#163962",
          800: "#0f2a4a",
          900: "#0a1e35",
          950: "#060f1c",
        },
        copper: {
          50: "#fdf6f0",
          100: "#fae8d8",
          200: "#f5d0b0",
          300: "#edb07d",
          400: "#e48d4f",
          500: "#d4703a",
          600: "#b8572c",
          700: "#964325",
          800: "#7a3520",
          900: "#632d1d",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
