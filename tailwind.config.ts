import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        night: {
          DEFAULT: "#1C1612",
          50: "#2A241E",
          100: "#1C1814",
        },
        paper: {
          DEFAULT: "#F7F1E6",
          50: "#FFFBF4",
          100: "#EDE4D4",
        },
        ink: {
          DEFAULT: "#1C1612",
          soft: "#4A4038",
          mute: "#6B5F54",
        },
        amber: {
          DEFAULT: "#C46F28",
          dim: "#A85A1C",
        },
        clay: "#C15A45",
        sage: "#5F7F6B",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        sheet: "0.18em",
      },
      boxShadow: {
        sheet: "0 24px 60px -20px rgba(28, 22, 18, 0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
