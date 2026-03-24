import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "var(--bg-base)",
        surface: {
          DEFAULT: "var(--surface)",
          hover: "var(--surface-hover)",
        },
        border: "var(--border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        cardinal: {
          DEFAULT: "#660000",
          bright: "#990000",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "2rem",
        lg: "4rem",
        xl: "8rem",
      },
      keyframes: {
        meshFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "25%": { transform: "translate(5%, -5%) scale(1.1)" },
          "50%": { transform: "translate(-3%, 5%) scale(0.95)" },
          "75%": { transform: "translate(5%, 3%) scale(1.05)" },
        },
        pulseGlow: {
          "0%": { opacity: "0.6", transform: "translateX(-50%) scale(0.95)" },
          "100%": {
            opacity: "0.9",
            transform: "translateX(-50%) scale(1.05)",
          },
        },
        ticker: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(-50%, 0, 0)" },
        },
      },
      animation: {
        "mesh-float": "meshFloat 12s ease-in-out infinite",
        "mesh-float-delay-1": "meshFloat 12s ease-in-out infinite -3s",
        "mesh-float-delay-2": "meshFloat 12s ease-in-out infinite -6s",
        "mesh-float-delay-3": "meshFloat 12s ease-in-out infinite -9s",
        "pulse-glow": "pulseGlow 8s ease-in-out infinite alternate",
        ticker: "ticker 40s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
