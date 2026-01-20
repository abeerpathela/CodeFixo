/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0f1419',      // Main background (Rich charcoal)
          card: '#1a1f2e',    // Card background (Dark blue-grey)
          border: '#2d3748',  // Border color (Muted slate)
          text: '#e2e8f0',    // Primary text (Light grey)
          muted: '#94a3b8',   // Secondary text
          accent: '#6366f1',  // Primary accent (Indigo)
          accentHover: '#818cf8', // Hover state
          success: '#10b981', // Green
          error: '#ef4444',   // Red
          warning: '#f59e0b'  // Amber
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Professional font
        mono: ['Fira Code', 'monospace'] // Code font
      }
    },
  },
  plugins: [],
}
