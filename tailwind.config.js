/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          muted: 'var(--color-text-muted)',
        },
        accent: 'var(--color-accent)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        xs:   ['0.8125rem', { lineHeight: '1.5' }],   // 13px
        sm:   ['0.9375rem', { lineHeight: '1.6' }],   // 15px
        base: ['1.0625rem', { lineHeight: '1.75' }],  // 17px
        lg:   ['1.1875rem', { lineHeight: '1.75' }],  // 19px
        xl:   ['1.3125rem', { lineHeight: '1.75' }],  // 21px
      },
    },
  },
  plugins: [],
}
