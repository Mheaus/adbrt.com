import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      animation: {
        fadescale: 'fadescale 1.4s infinite ease-in-out both',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        black: 'var(--color-black)',
        lighterBlue: 'var(--color-lighterBlue)',
        lightBlue: 'var(--color-lightBlue)',
        darkBlue: 'var(--color-darkBlue)',
        lightGray: 'var(--color-lightGray)',
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      keyframes: {
        fadescale: {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
