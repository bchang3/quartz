import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        poppins: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          blue: "#0448AB",
          gray: "#F4F6F9",
          yellow: "#FFAA00",
          navy: "#1B263B",
          light_blue: "#D1E3FA",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
