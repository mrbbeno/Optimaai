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
        bg: "#FBFBFD",
        surface: "#FFFFFF",
        "surface-raised": "#F5F5F7",
        border: "rgba(0, 0, 0, 0.1)",
        "border-subtle": "rgba(0, 0, 0, 0.05)",
        muted: "#E5E5EA",
        primary: "#1D1D1F",
        secondary: "#86868B",
        tertiary: "#9CA3AF",
        accent: "#6366F1", // Indigo 500
        "accent-subtle": "rgba(99, 102, 241, 0.08)",
        "accent-border": "rgba(99, 102, 241, 0.2)",
      },
      fontFamily: {
        display: ["var(--font-inter)", "sans-serif"],
        ui: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        script: ["var(--font-script)", "cursive"],
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
