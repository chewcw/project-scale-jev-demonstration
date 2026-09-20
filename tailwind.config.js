import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        scale: {
          dark: "#f8fafc",
          panel: "#ffffff",
          accent: "#10b981",
          warning: "#f59e0b",
          danger: "#ef4444",
          info: "#3b82f6",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
