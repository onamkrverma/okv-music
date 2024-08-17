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
      backgroundImage: {
        custom_gradient:
          "linear-gradient(98.37deg, #f89e00 .99%, #da2f68 100%)",
      },
      textColor: {
        primary: "#ffffff",
      },
      boxShadow: {
        primary: "0 0 5px 5px #2d2d2d",
      },
    },
  },
  plugins: [],
};
export default config;
