module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    './public/**/*.html',
    './src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  //@swyx tailwind default extension https://play.tailwindcss.com/h7l9RbJTuu?file=config#
  theme: {
    extend: {
      colors: {
        "primary": "#63945D",
        "secondary": "#a1be9d"
      },
      typography: {
        DEFAULT: {
          css: {
            blockquote: {
              borderLeft: '3px solid red',
              fontSize: 'inherit',
              fontStyle: 'inherit',
              fontWeight: 'medium',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },

            'code::before': false,
            'code::after': false,
            'a:hover': {
              color: '#a1be9d !important',
              textDecoration: 'underline',
            },
            a: {
              color: '#63945D',
              textDecoration: 'none',
            },
            "a code": {
              color: 'unset'
            },
            "li, ul, ol": {
              margin: 0
            },
            "li > img": {
              margin: 0,
              display: 'inline'
            },
            'ol > li::marker': {
              color: 'var(--tw-prose-body)',
            },
            'ul > li::marker': {
              color: 'var(--tw-prose-body)',
            },
          },
        },
      },
    },
  },
};
