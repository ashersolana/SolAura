/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // SolAura dark blue/cyan theme
        'sol-dark': '#0a0f1e',
        'sol-navy': '#1a2744',
        'sol-blue': '#1e3a5f',
        'sol-cyan': '#00d4ff',
        'sol-cyan-light': '#7ee8fa',
        'sol-glow': '#00b4d8',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'cyan-glow': '0 0 20px rgba(0, 212, 255, 0.3)',
        'cyan-glow-lg': '0 0 40px rgba(0, 212, 255, 0.5)',
      },
      animation: {
        'pulse-cyan': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': { boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)' },
          'to': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
