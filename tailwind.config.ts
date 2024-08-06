import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        cardCar: "0px 4px 4px 2px rgba(0, 0, 0, 0.1)",
        filter: "0px 2px 2px 0px rgba(0, 0, 0, 0.15)",
      },
    },
    screens: {
      hd: '0px',
      xs: "375px",
      xm: "450px",
      sm: "680px",
      md: "768px",
      ml: "850px",
      mh: "940px",
      lg: "1024px",
      lx: "1150px",
      lm: "1200px",
      xl: "1280px",
      "1xl": "1360px",
      "2xl": "1440px",
      "3xl": "1536px",
    },
  },
  plugins: [],
};
export default config;
