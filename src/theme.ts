import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  colors: {
    brand: {
      light: '#F8E7F6',
      medium: '#DD88CF',
      dark: '#4B164C',
      white: '#F5F5F5',
    },
  },
  fonts: {
    heading: '"Noto Sans Mono", monospace',
    body: '"Noto Sans Mono", monospace',
  },
  styles: {
    global: {
      body: {
        bg: 'brand.white',
        color: 'brand.dark',
        minHeight: '100vh',
        width: '100vw',
        margin: 0,
        padding: 0,
        overflowX: 'hidden',
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