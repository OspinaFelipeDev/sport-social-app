// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://OspinaFelipeDev.github.io/sport-social-app',
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
