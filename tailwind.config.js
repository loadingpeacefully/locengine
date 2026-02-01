/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    { pattern: /(bg|text|border)-(cyan|fuchsia|amber|emerald)-(400|500|600)/ },
    { pattern: /(bg|text|border)-(cyan|fuchsia|amber|emerald)-(400|500|600)\/(10|20|30|40|50)/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'], // Ensuring that crisp code look
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#02040a',       // The deep black background
          panel: '#0b0c15',    // The card/sidebar background
          cyan: '#22d3ee',
          pink: '#d946ef',
          dim: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}