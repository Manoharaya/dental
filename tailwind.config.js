/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        clinic: {
          base: '#0A110F',
          surface: '#0E1614',
          card: '#131F1C',
          'card-hover': '#182723',
          border: 'rgba(62, 217, 192, 0.12)',
          'border-light': 'rgba(255, 255, 255, 0.07)',
        },
        teal: {
          300: '#7CEBD8',
          400: '#52E0C7',
          500: '#3ED9C0', // Precision Mint-Teal
          600: '#2BB9A2',
          700: '#1E8D7B',
        },
        porcelain: {
          DEFAULT: '#F2E9DC', // Warm Porcelain Ivory
          muted: '#C5BDB2',
          dark: '#9E968B',
        },
        sage: {
          muted: '#A8B8B4',
          light: '#D1DED9',
          dark: '#53635F',
        },
        brand: {
          50: '#F0FDFB',
          100: '#CCFBF4',
          200: '#99F6E6',
          300: '#5EEAD4',
          400: '#52E0C7',
          500: '#3ED9C0', // Clinical-luxe mint-teal
          600: '#2BB9A2',
          700: '#1E8D7B',
          800: '#136356',
          900: '#0E483F',
          950: '#062C27',
        },
        luxury: {
          gold: '#C5A880',
          'gold-light': '#DFC4A4',
          'gold-dark': '#A0825B',
          champagne: '#F7F3EE',
          slate: '#0E1614',
          navy: '#0A110F',
          card: '#131F1C',
          border: 'rgba(62, 217, 192, 0.12)',
        },
        alabaster: '#0A110F',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 30px -5px rgba(62, 217, 192, 0.3)',
        'glow-teal': '0 0 35px -5px rgba(62, 217, 192, 0.35)',
        'glow-porcelain': '0 0 30px -5px rgba(242, 233, 220, 0.2)',
        'tactile-teal': 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 20px -2px rgba(62, 217, 192, 0.35)',
        'tactile-dark': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 16px -2px rgba(0, 0, 0, 0.6)',
        'luxury': '0 20px 40px -15px rgba(0, 0, 0, 0.7)',
        'luxury-dark': '0 25px 50px -12px rgba(0, 0, 0, 0.85)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
