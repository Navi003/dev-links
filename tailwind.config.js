/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "#633cff", // Primary color
        secondary: "#EFEBFF", // Secondary color
        "bg-light": "#FAFAFA", // Background light color
        "bg-main": "#FFFFFF", // Background main color
        "text-dark": "#333333", // Text dark color
        "text-light": "#737373", // Text light color
      },
    },
  },
  plugins: [],
};
