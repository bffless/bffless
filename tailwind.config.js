/** @type {import('tailwindcss').Config} */

// Variant A — "Editorial ledger". White paper, coffee rules, a single red for
// the primary action. The token names are unchanged from the control design so
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
          DEFAULT: '#FCFBF8',
          deep: '#F5F1E8',
          line: '#E6E0D4',
          edge: '#D6CFC2',
        },
        ink: {
          DEFAULT: '#1C1917',
          soft: '#44403C',
          // Accessible floor for small mono labels on white paper (≈7:1).
          label: '#57534E',
          mute: '#78716C',
          faint: '#A8A29E',
        },
        // The one loud colour: primary actions and the "now" marker only.
        terracotta: {
          DEFAULT: '#D63B2F',
          hover: '#B82E24',
          ink: '#8A221A',
        },
        // Warm brown accent for eyebrows, rules, and italic display words.
        coffee: {
          DEFAULT: '#6B4F3A',
          soft: '#C9B8A6',
          wash: '#EFE8DB',
        },
        // Legacy aliases — keep so existing modals/chat components still compile.
        cream: '#FCFBF8',
        'cream-dark': '#E6E0D4',
        charcoal: '#1C1917',
        'charcoal-light': '#44403C',
        'charcoal-muted': '#78716C',
      },
      fontFamily: {
        sans: ['"Schibsted Grotesk"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Instrument Serif"', '"EB Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        widest: '0.22em',
      },
      maxWidth: {
        page: '1200px',
      },
    },
  },
  plugins: [],
};
