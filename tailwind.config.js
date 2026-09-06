/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          200: '#BAE6FD',
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0EA5E9', // Primary surgical cyan
          600: '#0284C7',
          700: '#0369A1',
          800: '#075985',
          900: '#0C4A6E',
          950: '#082F49',
        },
        luxury: {
          gold: '#C5A880',
          'gold-light': '#DFC4A4',
          'gold-dark': '#A0825B',
          champagne: '#F7F3EE',
          slate: '#0F172A',
          navy: '#0A1128',
          card: '#111827',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        alabaster: '#FAFAF9',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(14, 165, 233, 0.25)',
        'glow-gold': '0 0 25px -5px rgba(197, 168, 128, 0.3)',
        'luxury': '0 20px 40px -15px rgba(15, 23, 42, 0.07)',
        'luxury-dark': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
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
