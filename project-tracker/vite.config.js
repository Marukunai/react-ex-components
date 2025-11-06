import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 1. Utilitzem JSDOM per simular el navegador
    environment: 'jsdom', 
    // 2. Fitxer que s'executa abans de cada prova (per configurar RTL)
    setupFiles: ['./setupTests.js'], 
    // 3. Patró per trobar els fitxers de prova (p. ex., ProjectList.test.jsx)
    globals: true, // Permet utilitzar expect, describe, test, etc. sense import
  },
})