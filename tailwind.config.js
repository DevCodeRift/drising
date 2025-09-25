/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Destiny-inspired color palette
        destiny: {
          primary: '#0066CC',    // Destiny blue
          secondary: '#FFD700',  // Golden
          dark: '#0A0A0A',      // Deep black
          gray: {
            100: '#F5F5F5',
            200: '#E0E0E0',
            300: '#BDBDBD',
            400: '#9E9E9E',
            500: '#757575',
            600: '#424242',
            700: '#2D2D2D',
            800: '#1A1A1A',
            900: '#0F0F0F',
          },
          accent: {
            solar: '#FFD700',     // Solar/Arc energy
            void: '#9932CC',      // Void energy
            stasis: '#4FB3D9',    // Stasis energy
            strand: '#50C878',    // Strand energy
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 102, 204, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 102, 204, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'destiny-gradient': 'linear-gradient(135deg, #0066CC 0%, #1e40af 50%, #312e81 100%)',
        'hero-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#E0E0E0',
            a: {
              color: '#0066CC',
              '&:hover': {
                color: '#FFD700',
              },
            },
            h1: {
              color: '#FFFFFF',
            },
            h2: {
              color: '#F5F5F5',
            },
            h3: {
              color: '#E0E0E0',
            },
            blockquote: {
              color: '#BDBDBD',
              borderLeftColor: '#0066CC',
            },
            code: {
              color: '#FFD700',
              backgroundColor: '#1A1A1A',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}