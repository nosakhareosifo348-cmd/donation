/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e8532a',
        'primary-dark': '#c94520',
        secondary: '#1a3c5e',
        'secondary-dark': '#0f2840',
        accent: '#f5a623',
        dark: '#1a1a1a',
        light: '#f9f9f9',
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Poppins', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
