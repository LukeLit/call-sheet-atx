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
          DEFAULT: "#100E0C",
          50: "#2A241E",
          100: "#1C1814",
        },
        paper: {
          DEFAULT: "#F3EBE0",
          50: "#FAF6F0",
          100: "#E8DCCE",
        },
        ink: {
          DEFAULT: "#1C1612",
          soft: "#5C5248",
          mute: "#7A7066",
        },
        amber: {
          DEFAULT: "#E08A3C",
          dim: "#C46F28",
        },
        clay: "#C15A45",
        sage: "#7A9A86",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        sheet: "0.18em",
      },
      boxShadow: {
        sheet: "0 24px 60px -20px rgba(16, 14, 12, 0.55)",
      },
    },
  },
  plugins: [],
};

export default config;
