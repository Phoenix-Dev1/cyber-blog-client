/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Legacy (kept for backward compat)
        royalblue: "#4169E1",
        lavilavi: "#CCCCFF",
        lightgray: "#F5F5F5",
        lightgraytwo: "#F5F5F6",
        // CyberSphere Dark Theme
        "cyber-bg": "#0B0F19",
        "cyber-surface": "rgba(255,255,255,0.05)",
        "cyber-border": "rgba(255,255,255,0.08)",
        "cyber-cyan": "#00F0FF",
        "cyber-purple": "#B026FF",
        "cyber-card": "#111827",
        "cyber-muted": "#94a3b8",
        "cyber-text": "#e2e8f0",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px rgba(0,240,255,0.35)",
        "glow-purple": "0 0 20px rgba(176,38,255,0.45)",
        "glow-purple-sm": "0 0 12px rgba(176,38,255,0.3)",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, #00F0FF 0%, #B026FF 100%)",
        "cyber-gradient-r": "linear-gradient(to right, #00F0FF, #B026FF)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 1s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
