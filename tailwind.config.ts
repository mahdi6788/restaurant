import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust paths to match your project structure
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
    },
  },
  variants: {
    extend: {
      padding: ["direction"],
      margin: ["direction"],
      textAlign: ["direction"],
    },
  },
  plugins: [],
} satisfies Config;
