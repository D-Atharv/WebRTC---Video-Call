import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '16/9': '16 / 9',
        '4/3': '4 / 3',
        '21/9': '21 / 9',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
export default config;
