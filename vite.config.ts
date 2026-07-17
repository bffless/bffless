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
    proxy: {
      // Auth surface + telemetry stats live on the deployed site. Proxy them to
      // the real backend so the dashboard's session check + stats fetch resolve
      // in local dev. (Login still redirects to the admin host; localhost won't
      // be an accepted relay targetDomain — exercise the full flow on deploy.)
      '/_bffless': {
        target: 'https://bffless.app',
        changeOrigin: true,
      },
      '/api/telemetry': {
        target: 'https://bffless.app',
        changeOrigin: true,
      },
      '/api/developer-review': {
        target: 'https://landing.sandbox.workspace.bffless.app',
        changeOrigin: true,
      },
      '/api/feedback-form': {
        target: 'https://landing.sandbox.workspace.bffless.app',
        changeOrigin: true,
      },
      '/api/pricing-form': {
        target: 'https://landing.sandbox.workspace.bffless.app',
        changeOrigin: true,
      },
      '/api/contact-form': {
        target: 'https://landing.sandbox.workspace.bffless.app',
        changeOrigin: true,
      },
      '/api/episodes': {
        target: 'https://landing.sandbox.workspace.bffless.app',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://chat.docs.bffless.app',
        changeOrigin: true,
      },
    },
  },
});
