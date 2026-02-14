import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // The third parameter '' ensures we load all env vars, including those from Netlify that don't start with VITE_
  const env = loadEnv(mode, '.', '');

  // Prioritize variable from loaded env (Netlify/Local .env) or fallback to process.env
  const apiKey = env.API_KEY || process.env.API_KEY;

  return {
    plugins: [react()],
    define: {
      // This injection is critical. It replaces `process.env.API_KEY` in the source code 
      // with the actual string value during the build time.
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
    build: {
      outDir: 'dist',
    }
  };
});