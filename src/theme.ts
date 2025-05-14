import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      background: '#000000',
      text: '#FFFFFF',
      accent: '#39FF14', // Neon green
    },
  },
  fonts: {
    heading: '"Noto Sans Mono", monospace',
    body: '"Noto Sans Mono", monospace',
  },
  styles: {
    global: {
      html: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
      },
      body: {
        bg: 'brand.background',
        color: 'brand.text',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      },
      '#root': {
        minHeight: '100vh',
        width: '100%',
      },

      // Default link styles without underline
      'a:not(.header-link):not(.portfolio-link):not(.no-underline):not([data-no-underline])': {
        position: 'relative',
        color: 'brand.text',
        textDecoration: 'none !important',
        _hover: {
          color: 'brand.accent',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '0',
          height: '2px',
          bottom: '-2px',
          left: '0',
          backgroundColor: 'var(--chakra-colors-brand-accent)',
          transition: 'width 0.3s ease-in-out',
        },
        '&:hover::after': {
          width: '100%',
        },
      },

      // Excluded links (icons, buttons, etc.)
      '.no-underline, [data-no-underline]': {
        textDecoration: 'none !important',
        '&::after': {
          display: 'none !important',
        },
        _hover: {
          textDecoration: 'none !important',
        },
      },
    },
  },
});

export default theme;