import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
    accent: {
      50: '#E3F9E5',
      100: '#C1EAC5',
      200: '#A3D9A5',
      300: '#7BC47F',
      400: '#57AE5B',
      500: '#3F9142',
      600: '#2F8132',
      700: '#207227',
      800: '#0E5814',
      900: '#05400A',
    },
    warm: {
      50: '#FFF8E1',
      100: '#FFECB3',
      200: '#FFE082',
      300: '#FFD54F',
      400: '#FFCA28',
      500: '#FFC107',
      600: '#FFB300',
      700: '#FFA000',
      800: '#FF8F00',
      900: '#FF6F00',
    }
  },
  fonts: {
    heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif`,
    body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      }
    }
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: 'xl',
        fontWeight: 'semibold',
        _active: {
          transform: 'scale(0.98)',
        }
      },
      sizes: {
        lg: {
          h: '56px',
          fontSize: 'lg',
          px: '32px',
        }
      },
      variants: {
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
          _active: {
            bg: 'brand.700',
          }
        },
        success: {
          bg: 'accent.500',
          color: 'white',
          _hover: {
            bg: 'accent.600',
          }
        }
      }
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: '2xl',
          boxShadow: 'lg',
        }
      }
    }
  },
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
})

export default theme
