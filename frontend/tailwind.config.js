/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Použití 'class' pro tmavý režim
  theme: {
    extend: {
      colors: {
        background: '#181C14', // Hlavní pozadí
        secondaryBackground: '#697565', // Sekundární pozadí
        accent: '#3C3D37', // Akcent
        textPrimary: '#ECDFCC', // Barva textu
        textSecondary: '#FFFFFF', // Sekundární barva textu
      },
      fontFamily: {
        nowharehouse: ['Nowharehouse', 'sans-serif'], // Add the new font here
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};