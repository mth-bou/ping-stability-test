import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dracula"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
      serif: ['Roboto', 'serif'],
    },
    extend: {
    },
  },
  daisyui: {
    themes: [
      {
        myDarkTheme: {
          "purple-dark": "#404258",
          "purple": "#474E68",
          "purple-light": "#50577A",
          "gray": '#6B728E',
          "light": '#fff',
          "dark": "#000",
          "info": "#d1d5db",
          "success": "#86efac",
          "warning": "#fdba74",
          "error": "#f87171",

          "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
        }
      },
      "light",
      "dark",
      "dracula",
    ]
  },
  plugins: [
      require("daisyui"),
  ],
}
export default config
