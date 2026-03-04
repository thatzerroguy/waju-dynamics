/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        cream: '#F5F3EF',
        charcoal: '#0A0A0A',
        mid: '#1C1A17',
        stone: '#C8B89A',
        muted: '#6B6560',
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
    },
  },
  plugins: [],
};