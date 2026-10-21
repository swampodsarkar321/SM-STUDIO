/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0c1222',
        panel: '#f7f8fb',
        line: 'rgba(15,23,42,.10)',
        brand: {
          50: '#eef3ff',
          100: '#e0eaff',
          200: '#c3d5ff',
          300: '#97b4fc',
          400: '#6487f8',
          500: '#2f54eb',
          600: '#1f41d8',
          700: '#1a35ae',
          800: '#182d8c',
          900: '#16276f',
        },
        accent: '#0ea5e9',
        mint: '#0e9f6e',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 14px 34px -14px rgba(47,84,235,.5)',
        card: '0 24px 48px -30px rgba(12,18,34,.22), 0 1px 2px rgba(12,18,34,.05)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(120deg, #1f41d8 0%, #2f54eb 40%, #0ea5e9 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '.45' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        fadeUp: 'fadeUp .7s ease-out both',
        pulseSoft: 'pulseSoft 2.4s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
      },
    },
  },
  plugins: [],
}
