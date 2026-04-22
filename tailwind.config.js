/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        // Design token surface system
        surface: {
          base:     '#050506',
          raised:   '#0a0a0d',
          overlay:  '#0f0f14',
          high:     '#141419',
        },
        // Semantic foreground tokens
        ink: {
          DEFAULT: '#EDEDEF',
          muted:   '#8A8F98',
          faint:   '#4D5260',
        },
        // Accent system
        accent: {
          blue:    '#3B82F6',
          indigo:  '#5E6AD2',
          violet:  '#7C3AED',
        },
      },
      backgroundImage: {
        'hero-glow':   'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(59,130,246,0.18), rgba(94,106,210,0.08) 50%, transparent 80%)',
        'card-glow':   'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(59,130,246,0.06), transparent)',
        'cta-glow':    'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(94,106,210,0.15), rgba(124,58,237,0.08) 60%, transparent)',
        'grid-lines':  'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        'btn-primary': 'linear-gradient(135deg, #3B82F6 0%, #5E6AD2 50%, #7C3AED 100%)',
        'shine':       'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      boxShadow: {
        'glow-sm':  '0 0 12px rgba(59,130,246,0.18)',
        'glow':     '0 0 24px rgba(59,130,246,0.22), 0 0 48px rgba(94,106,210,0.12)',
        'glow-lg':  '0 0 40px rgba(59,130,246,0.25), 0 0 80px rgba(94,106,210,0.15)',
        'card':     '0 1px 0 rgba(255,255,255,0.04) inset, 0 1px 3px rgba(0,0,0,0.5)',
        'card-hover': '0 1px 0 rgba(255,255,255,0.06) inset, 0 4px 24px rgba(0,0,0,0.6), 0 0 0 1px rgba(59,130,246,0.12)',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.08)',
      },
      animation: {
        'float':         'float 7s cubic-bezier(0.45,0.05,0.55,0.95) infinite',
        'blob-slow':     'blob 18s ease-in-out infinite',
        'blob-slow-alt': 'blob 22s ease-in-out infinite reverse',
        'pulse-slow':    'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'shine':         'shine 3s ease-in-out infinite',
        'gradient-x':    'gradient-x 8s ease infinite',
        'fade-in':       'fade-in 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-14px) rotate(1deg)' },
          '66%':     { transform: 'translateY(-7px) rotate(-0.5deg)' },
        },
        blob: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '25%':     { transform: 'translate(30px,-20px) scale(1.05)' },
          '50%':     { transform: 'translate(-20px,30px) scale(0.95)' },
          '75%':     { transform: 'translate(20px,20px) scale(1.02)' },
        },
        shine: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%':     { backgroundPosition: '100% 50%' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
