import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: "#E8593C", hover: "#D14B30" },
        secondary: { DEFAULT: "#1D9E75", hover: "#178663" },
        warm:      "#FBF8F5",
        dark:      "#1C1917",
      },
    },
  },
  plugins: [],
};

export default config;