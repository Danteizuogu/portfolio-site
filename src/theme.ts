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
      body: {
        bg: 'brand.background',
        color: 'brand.text',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
      },
      a: {
        color: 'brand.text',
        textDecoration: 'underline',
        textDecorationColor: 'brand.accent',
        _hover: {
          color: 'brand.accent',
          textDecoration: 'none',
        },
      },
      html: {
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
      },
      '#root': {
        minHeight: '100vh',
        width: '100%',
      },
      'a:not(.social-link)': {
        position: 'relative',
        textDecoration: 'none',
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '0',
          height: '2px',
          bottom: '-2px',
          left: '0',
          backgroundColor: 'var(--chakra-colors-brand-medium)',
          transition: 'width 0.3s ease-in-out',
        },
        '&:hover::after': {
          width: '100%',
        },
      },
      '.social-link': {
        textDecoration: 'none !important',
        '&:hover': {
          textDecoration: 'none !important',
        },
      },
    },
  },
})

export default theme 