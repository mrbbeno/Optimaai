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
        bg: "#080809",
        surface: "#0F0F11",
        "surface-raised": "#141416",
        border: "#1C1C1F",
        "border-subtle": "#161618",
        muted: "#2A2A2E",
        primary: "#F2F2F0",
        secondary: "#8A8A8F",
        tertiary: "#52525A",
        accent: "#B8973E",
        "accent-subtle": "rgba(184, 151, 62, 0.08)",
        "accent-border": "rgba(184, 151, 62, 0.2)",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        ui: ["var(--font-ui)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sharp: "4px",
      },
      spacing: {
        section: "160px",
        "section-mobile": "100px",
      },
    },
  },
  plugins: [],
};
export default config;
