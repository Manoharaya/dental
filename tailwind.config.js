/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        spa: {
          base: '#FBFAF7',     // Soft porcelain white base
          ivory: '#F5F1EA',    // Warm ivory surface
          surface: '#FFFFFF',  // Pure white card base
          charcoal: '#1B2B27', // Deep charcoal-teal text
          muted: '#536963',    // Soft charcoal-teal body text
          teal: '#3E8E7E',     // Primary cool sage-teal accent
          'teal-hover': '#337769',
          sage: '#5FA592',     // Secondary sage accent
          mint: '#D4EFE8',     // Pale mint ambient glow
          blush: '#F9EBE7',    // Soft blush ambient glow
          border: 'rgba(27, 43, 39, 0.08)', // Hairline border
        },
        clinic: {
          base: '#FBFAF7',
          surface: '#F5F1EA',
          card: '#FFFFFF',
          'card-hover': '#FFFFFF',
          border: 'rgba(27, 43, 39, 0.08)',
          'border-light': 'rgba(27, 43, 39, 0.05)',
        },
        teal: {
          50: '#F0F9F7',
          100: '#D4EFE8',
          200: '#ADE2D5',
          300: '#84D1C0',
          400: '#5FA592',
          500: '#3E8E7E', // Cool sage-teal
          600: '#337769',
          700: '#275E53',
          800: '#1C453D',
          900: '#1B2B27', // Deep charcoal-teal
        },
        brand: {
          50: '#F0F9F7',
          100: '#D4EFE8',
          200: '#ADE2D5',
          300: '#84D1C0',
          400: '#5FA592',
          500: '#3E8E7E',
          600: '#337769',
          700: '#275E53',
          800: '#1C453D',
          900: '#1B2B27',
        },
        luxury: {
          slate: '#1B2B27',
          card: '#FFFFFF',
          border: 'rgba(27, 43, 39, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      boxShadow: {
        'spa': '0 10px 30px -10px rgba(27, 43, 39, 0.06), 0 20px 25px -5px rgba(27, 43, 39, 0.03)',
        'spa-hover': '0 16px 40px -12px rgba(27, 43, 39, 0.1), 0 24px 30px -8px rgba(27, 43, 39, 0.05)',
        'tactile-teal': '0 8px 20px -4px rgba(62, 142, 126, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
        'tactile-light': '0 4px 14px rgba(27, 43, 39, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        'glow-mint': '0 0 40px 10px rgba(212, 239, 232, 0.6)',
        'glow-blush': '0 0 40px 10px rgba(249, 235, 231, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      }
    },
  },
  plugins: [],
}
