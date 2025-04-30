/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Adjust paths to match your project structure
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
       spin: "spin 1s linear infinite",
      }
    },
  },
  darkMode: "class", // Use 'class' to toggle dark mode by adding/removing a class
  plugins: [],
  variants: {
    extend: {
      padding: ['direction'],
      margin: ['direction'],
      textAlign: ['direction']
    }
  }
}

