/** @type {import('tailwindcss').Config} */

// Variant B — "Product tour". Pure white page, coffee panels, rounded cards,
// Archivo display type. Token names are unchanged from the control design so
// the shared modals and chat components re-theme without edits.
export default {
  content: [
    './index.html',
    './privacy.html',
    './terms.html',
    './dashboard.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FFFFFF',
          deep: '#F5F1E8',
          line: '#E6E0D4',
          edge: '#D6CFC2',
        },
        ink: {
          DEFAULT: '#1C1917',
          soft: '#57534E',
          label: '#57534E',
          mute: '#78716C',
          faint: '#A8A29E',
        },
        terracotta: {
          DEFAULT: '#D63B2F',
          hover: '#B82E24',
          ink: '#8A221A',
        },
        coffee: {
          DEFAULT: '#6B4F3A',
          soft: '#C9B8A6',
          wash: '#EFE8DB',
          deep: '#2A211B',
        },
        // Legacy aliases — keep so existing modals/chat components still compile.
        cream: '#FFFFFF',
        'cream-dark': '#E6E0D4',
        charcoal: '#1C1917',
        'charcoal-light': '#44403C',
        'charcoal-muted': '#78716C',
      },
      fontFamily: {
        sans: ['"Archivo"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Instrument Serif"', '"EB Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card: '20px',
        tile: '16px',
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
};
