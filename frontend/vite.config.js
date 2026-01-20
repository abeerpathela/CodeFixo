import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://codefixo.onrender.com/api')
  },
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true,
  },
})
