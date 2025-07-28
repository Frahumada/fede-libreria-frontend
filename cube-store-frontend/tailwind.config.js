// tailwind.config.js
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
  'bg-logo_1',
  'bg-logo_2',
  'bg-logo_3',
  'bg-logo_4',
  'bg-primary',
  'bg-primary/90',
  'text-primary',
  'text-white',
  'hover:bg-primary/90',
  'hover:bg-primary/80',
  'bg-secondary',
  'bg-secondary/90',
  'text-secondary',
  'hover:bg-secondary/90',
  'bg-accent',
  'text-accent',
  'hover:bg-accent/90',
  'border-primary',
  'border-secondary',
  'border-accent',
  'hover:bg-primary/10',
  'hover:bg-secondary/10',
  'hover:bg-accent/10',
  'bg-red-600',
  'hover:bg-red-500',
  'text-red-600',
  'border-red-600',
  'hover:bg-red-100',
],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        primary: '#52b3aa',
        secondary: '#64748B',
        accent: '#F59E0B',
        logo_1: '#fee394',
        logo_2: '#a1dbcf',
        logo_3: '#ffc1b2',
        logo_4: '#55b2a7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [
    forms,
    typography,
  ],
};
