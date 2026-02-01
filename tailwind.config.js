/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Ensure all color combinations for status badges are generated
    { pattern: /(bg|text|border)-(cyan|fuchsia|amber|emerald|red)-(400|500|600|900)/ },
    { pattern: /(bg|text|border)-(cyan|fuchsia|amber|emerald|red)-(400|500|600|900)\/(10|20|30|40|50)/ },
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Courier New"', 'monospace'], 
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        cyber: {
          bg: '#02040a',       
          panel: '#0b0c15',    
          cyan: '#22d3ee',
          pink: '#d946ef',
          dim: '#1e293b'
        }
      }
    },
  },
  plugins: [],
}