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
    },
  },
})

export default theme 