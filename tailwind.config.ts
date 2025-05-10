import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // light
          dark: '#22C55E',   // dark
        },
        secondary: {
          DEFAULT: '#3B82F6',
          dark: '#38BDF8',
        },
        accent: {
          DEFAULT: '#F59E0B',
          dark: '#F97316',
        },
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#0F172A',
        },
        surface: {
          DEFAULT: '#F3F4F6',
          dark: '#1E293B',
        },
        'text-primary': {
          DEFAULT: '#1F2937',
          dark: '#F3F4F6',
        },
        'text-secondary': {
          DEFAULT: '#6B7280',
          dark: '#94A3B8',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 