import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const host = 'localhost';
const port = 8000;

export default defineConfig({
  
  plugins: [react()],
})
