/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/constants/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          navy: '#0a0a2e',
          charcoal: '#141418',
          midnight: '#1a1a2e',
          violet: '#7b28eb',
          indigo: '#4f46e5',
          accent: '#a78bfa',
          glass: 'rgba(255, 255, 255, 0.05)',
        },
        light: {
          card: 'rgba(255, 255, 255, 0.8)',
          border: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
}