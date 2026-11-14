/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aura: {
          violet: '#8B5CF6',
          cyan: '#06B6D4',
          burgundy: '#66001F',
          burgundyDeep: '#580F1E',
          rose: '#EC4899',
          gold: '#F59E0B',
          obsidian: '#090A0F',
          darkSurface: '#0E1118',
          glassBorder: 'rgba(255, 255, 255, 0.12)',
          glassBorderBright: 'rgba(255, 255, 255, 0.28)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        display: ['Cabinet Grotesk', 'Plus Jakarta Sans', 'sans-serif']
      },
      backgroundImage: {
        'iridescent-conic': 'conic-gradient(from 180deg at 50% 50%, #8B5CF6 0deg, #06B6D4 90deg, #EC4899 180deg, #66001F 270deg, #8B5CF6 360deg)',
        'hologram-grid': 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
      },
      animation: {
        'shimmer': 'shimmer 6s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'scanline': 'scanline 2s linear infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
