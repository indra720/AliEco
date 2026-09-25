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
        oranza: {
          DEFAULT: "#FF6A00",
          50: "#FFF3E8",
          100: "#FFE6D1",
          200: "#FFC9A3",
          300: "#FFA86E",
          400: "#FF8A00",
          500: "#FF6A00",
          600: "#E85D00",
          700: "#C44B00",
          800: "#993B00",
          900: "#702A00",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          secondary: "#F7F7F7",
          subtle: "#F3F4F6",
        },
        ink: {
          DEFAULT: "#171717",
          secondary: "#666666",
          tertiary: "#9CA3AF",
        },
        border: "#E5E5E5",
        success: "#16A34A",
        danger: "#DC2626",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        "card-hover": "0 8px 24px -4px rgba(0, 0, 0, 0.08), 0 4px 8px -2px rgba(0, 0, 0, 0.04)",
        dropdown: "0 10px 30px 0 rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        brand: "8px",
        card: "10px",
      }
    },
  },
  plugins: [],
};
export default config;
