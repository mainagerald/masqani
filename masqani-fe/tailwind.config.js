/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#1F1F1F',
          100: '#2A2A2A',
          200: '#333333',
          300: '#4D4D4D',
          400: '#666666',
          500: '#7F7F7F', 
          600: '#A0A0A0',
          700: '#B3B3B3',
          800: '#C6C6C6',
          900: '#D9D9D9'
        },
        secondary: {
          50: '#0D0D0D',
          100: '#1A1A1A',
          200: '#262626',
          300: '#333333',
          400: '#4D4D4D',
          500: '#66BBFF', // Light blue for accents
          600: '#42A5F5',
          700: '#2196F3',
          800: '#1E88E5',
          900: '#1A73E8'
        },
        accent: {
          50: '#F0F0F0',
          100: '#E0E0E0',
          200: '#D0D0D0',
          300: '#C0C0C0',
          400: '#B0B0B0',
          500: '#A0A0A0',
          600: '#909090',
          700: '#808080',
          800: '#707070',
          900: '#606060'
        },
        neutral: {
          50: '#F3F4F6',
          100: '#E5E7EB',
          200: '#D1D5DB',
          300: '#9CA3AF',
          400: '#6B7280',
          500: '#4B5563',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}
