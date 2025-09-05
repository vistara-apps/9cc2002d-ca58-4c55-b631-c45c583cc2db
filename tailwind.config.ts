import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Unified design system color tokens
        primary: {
          DEFAULT: "hsl(210, 70%, 50%)",
          50: "hsl(210, 70%, 95%)",
          100: "hsl(210, 70%, 90%)",
          200: "hsl(210, 70%, 80%)",
          300: "hsl(210, 70%, 70%)",
          400: "hsl(210, 70%, 60%)",
          500: "hsl(210, 70%, 50%)",
          600: "hsl(210, 70%, 40%)",
          700: "hsl(210, 70%, 30%)",
          800: "hsl(210, 70%, 20%)",
          900: "hsl(210, 70%, 10%)",
          950: "hsl(210, 70%, 5%)",
        },
        accent: {
          DEFAULT: "hsl(130, 50%, 60%)",
          50: "hsl(130, 50%, 95%)",
          100: "hsl(130, 50%, 90%)",
          200: "hsl(130, 50%, 80%)",
          300: "hsl(130, 50%, 70%)",
          400: "hsl(130, 50%, 60%)",
          500: "hsl(130, 50%, 50%)",
          600: "hsl(130, 50%, 40%)",
          700: "hsl(130, 50%, 30%)",
          800: "hsl(130, 50%, 20%)",
          900: "hsl(130, 50%, 10%)",
          950: "hsl(130, 50%, 5%)",
        },
        // Background colors
        background: "hsl(210, 30%, 95%)",
        surface: "hsl(0, 0%, 100%)",
        dark: {
          bg: "hsl(220, 13%, 18%)",
          surface: "hsl(220, 13%, 25%)",
          text: "hsl(210, 40%, 98%)",
          muted: "hsl(220, 13%, 40%)",
        },
        // Semantic colors
        success: {
          DEFAULT: "hsl(142, 76%, 36%)",
          50: "hsl(142, 76%, 95%)",
          100: "hsl(142, 76%, 90%)",
          500: "hsl(142, 76%, 36%)",
          600: "hsl(142, 76%, 30%)",
        },
        warning: {
          DEFAULT: "hsl(38, 92%, 50%)",
          50: "hsl(38, 92%, 95%)",
          100: "hsl(38, 92%, 90%)",
          500: "hsl(38, 92%, 50%)",
          600: "hsl(38, 92%, 40%)",
        },
        error: {
          DEFAULT: "hsl(0, 84%, 60%)",
          50: "hsl(0, 84%, 95%)",
          100: "hsl(0, 84%, 90%)",
          500: "hsl(0, 84%, 60%)",
          600: "hsl(0, 84%, 50%)",
        },
        // Utility colors
        border: "hsl(220, 13%, 30%)",
        input: "hsl(220, 13%, 25%)",
        ring: "hsl(210, 70%, 50%)",
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
        '2xl': '48px',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      },
      boxShadow: {
        'card': '0 4px 12px hsla(0,0%,0%,0.08)',
        'card-dark': '0 4px 12px hsla(0,0%,0%,0.3)',
        'card-hover': '0 8px 24px hsla(0,0%,0%,0.15)',
        'focus': '0 0 0 3px hsl(210, 70%, 50%, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.2s ease-in-out',
        'slide-down': 'slideDown 0.2s ease-in-out',
        'bounce-subtle': 'bounceSubtle 0.5s ease-in-out',
        'pulse-subtle': 'pulseSubtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
    },
  },
  plugins: [],
};
export default config;
