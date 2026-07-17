/** @type {import('tailwindcss').Config} */
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
          DEFAULT: '#ECE3D2',
          deep: '#E4D9C4',
          line: '#D5C8AE',
        },
        ink: {
          DEFAULT: '#171513',
          soft: '#3A352E',
          // `label` is the accessible floor for small mono labels on the paper
          // ramp: ~6:1 on paper, ~5.6:1 on paper-deep (WCAG AA for small text).
          // `mute` (#7A7268, ~3.7:1) stays for decorative/illustrative use only.
          label: '#5A5046',
          mute: '#7A7268',
          faint: '#A9A095',
        },
        terracotta: {
          DEFAULT: '#D85A3D',
          hover: '#C24E33',
          ink: '#7A2D1D',
        },
        // Legacy aliases — keep so existing modals/chat components still compile.
        cream: '#ECE3D2',
        'cream-dark': '#D5C8AE',
        charcoal: '#171513',
        'charcoal-light': '#3A352E',
        'charcoal-muted': '#7A7268',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Fraunces"', '"EB Garamond"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        widest: '0.22em',
      },
      maxWidth: {
        page: '1280px',
      },
    },
  },
  plugins: [],
};
