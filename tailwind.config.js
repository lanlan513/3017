/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        parchment: {
          50: "#FBF5E9",
          100: "#F5EBD6",
          200: "#E8D7B3",
          300: "#D4B896",
          400: "#C4A67C",
          500: "#A68B5B",
          600: "#8B7044",
          700: "#6B5433",
          800: "#4A3A24",
          900: "#2C1F14",
        },
        ink: {
          50: "#E8E2DA",
          100: "#C9BFAF",
          200: "#A69882",
          300: "#84745A",
          400: "#6B5B47",
          500: "#4A3C2C",
          600: "#362B1F",
          700: "#2C1810",
          800: "#1E100A",
          900: "#140906",
        },
        blood: {
          50: "#F5E0D6",
          100: "#E8B8A3",
          200: "#D98A6B",
          300: "#C95C3F",
          400: "#B23A1C",
          500: "#8B2500",
          600: "#6E1D00",
          700: "#521500",
          800: "#360E00",
          900: "#1F0800",
        },
        moss: {
          50: "#E5EBE7",
          100: "#C2D0C5",
          200: "#9BB3A1",
          300: "#74967D",
          400: "#557C5F",
          500: "#2D4A3E",
          600: "#243B32",
          700: "#1B2D26",
          800: "#121E1A",
          900: "#0A1210",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Crimson Text"', 'serif'],
        typewriter: ['"Special Elite"', 'monospace'],
      },
      backgroundImage: {
        'parchment-texture': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noise)\" opacity=\"0.08\"/%3E%3C/svg%3E')",
        'fog-texture': "linear-gradient(180deg, rgba(44,24,16,0.95) 0%, rgba(44,24,16,0.85) 50%, rgba(44,24,16,0.95) 100%)",
      },
      boxShadow: {
        'parchment': '0 4px 20px rgba(44, 24, 16, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'stamp': '0 2px 8px rgba(139, 37, 0, 0.4)',
        'leather': '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.2)',
      },
      keyframes: {
        'stamp-down': {
          '0%': { transform: 'scale(3) rotate(-15deg)', opacity: '0' },
          '50%': { transform: 'scale(0.9) rotate(-5deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(-8deg)', opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'stamp-down': 'stamp-down 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
