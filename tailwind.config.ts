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
      animation: {
        typewriter: 'typewriter 2s steps(var(--steps)) forwards',
        caret: 'typewriter 2s steps(var(--steps)) forwards, blink 1s steps(var(--steps)) infinite 2s',
        blinkc: 'typewriter 0s steps(var(--steps)) forwards, blink 1s steps(var(--steps)) infinite 0s'
      },
      keyframes: {
        typewriter: {
          to: {
            left: '100%',
          },
        },
        blink: {
          '0%': {
            opacity: '0',
          },
          '0.1%': {
            opacity: '1',
          },
          '50%': {
            opacity: '1',
          },
          '50.1%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0',
          },
        },
      },
    },
  },
} satisfies Config;
