import type {Config} from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
        "dark",
        "light",
        "business",
        "night",
        "dracula",
        "nord",
        "winter",
        "retro",
        "synthwave",
      {
        sunset: {
            ...require("daisyui/src/theming/themes")["sunset"],
          borderRadius: "1rem",
        }
      }
    ],
  },
  darkMode: ['class', '[data-theme="dark"]']
};
export default config;
