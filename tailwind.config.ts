import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        foundation: "var(--color-foundation)",
        brand: "var(--color-brand)",
        accent: "var(--color-accent)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        focus: "var(--color-focus)",
        outline: "var(--color-outline)",
        track: "var(--color-track)",
      },
      zIndex: {
        skeleton: "1",
        content: "5",
        cover: "10",
        fullscreen: "50",
        popup: "100",
      },
    },
  },
};

export default config;
