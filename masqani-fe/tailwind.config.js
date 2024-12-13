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
          50: '#0D0D0D', // Deep black
          100: '#1A1A1A', // Slightly lighter black
          200: '#262626', // Dark grey
          300: '#333333',
          400: '#4D4D4D',
          500: '#666666', // Medium grey
          600: '#808080',
          700: '#A0A0A0', // Light grey
          800: '#C6C6C6',
          900: '#E0E0E0', // Near white
        },
        secondary: {
          500: '#66BBFF', // Light blue for accents (interactive elements)
          600: '#42A5F5',
          700: '#2196F3',
          800: '#1E88E5',
          900: '#1565C0', // Dark blue
        },
        accent: {
          50: '#F5F5F5', // Uber's white background
          100: '#E0E0E0',
          200: '#CCCCCC',
          300: '#B0B0B0',
          400: '#999999',
          500: '#808080', // Neutral greys
          600: '#666666',
          700: '#4D4D4D',
          800: '#333333',
          900: '#1A1A1A',
        },
        neutral: {
          50: '#FFFFFF', // Pure white
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#374151',
          700: '#1F2937',
          800: '#111827',
          900: '#0F172A', // Near black
        },
      },
      fontFamily: {
        sans: ['Uber Move', 'Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
};
