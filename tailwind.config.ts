import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#0d0d0d",
        secondary: "#171717",
      },
      textColor: {
        primary: "#ffffff",
      },
    },
  },
  plugins: [],
};
export default config;
