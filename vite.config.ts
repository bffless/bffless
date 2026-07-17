import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        terms: resolve(__dirname, 'terms.html'),
        privacy: resolve(__dirname, 'privacy.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
      },
    },
  },
  server: {
    // The deployed site at bffless.dev serves this build as its primary content
    // with both rule sets attached, so every /api/* route resolves there — including
    // /api/chat, which the landing-page-pipeline set proxies on to chat.bffless.dev.
    // Pointing dev at the one origin therefore mirrors production exactly.
    //
    // Auth is proxied for the dashboard's session check, but login still redirects to
    // the admin host and localhost won't be an accepted relay targetDomain — exercise
    // the full auth flow on a deployed preview, not here.
    proxy: {
      '/_bffless': {
        target: 'https://bffless.dev',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://bffless.dev',
        changeOrigin: true,
      },
    },
  },
});
