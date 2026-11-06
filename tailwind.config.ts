import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fdf2f4',
          100: '#fbe6e9',
          200: '#f7cfd6',
          300: '#efa9b6',
          400: '#e3778e',
          500: '#d14a68',
          600: '#b82f4e',
          700: '#9b223d',
          800: '#801e35',
          900: '#6d1c31',
          950: '#3e0a16',
        },
        gold: {
          50: '#fbf9ed',
          100: '#f6f0cf',
          200: '#eee09f',
          300: '#e3ca67',
          400: '#dab33b',
          500: '#c59b27',
          600: '#aa7a1e',
          700: '#88591a',
          800: '#71481b',
          900: '#613c1c',
          950: '#381f0c',
        },
        cream: {
          50: '#fdfbf7',
          100: '#faf5ed',
          200: '#f5ebdb',
          300: '#eddbc0',
          400: '#e2c59f',
          500: '#d5ae80',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-outfit)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 10px 30px -5px rgba(109, 28, 49, 0.12), 0 4px 12px -2px rgba(197, 155, 39, 0.08)',
        'luxury-hover': '0 20px 40px -10px rgba(109, 28, 49, 0.22), 0 8px 20px -4px rgba(197, 155, 39, 0.18)',
      },
    },
  },
  plugins: [],
};
export default config;
