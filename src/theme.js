import { extendTheme } from '@chakra-ui/react'

export const DEFAULT_THEME_ID = 'ocean'

export const themeOptions = [
  {
    id: 'ocean',
    name: '海岸蓝',
    description: '清爽、专注的默认学习配色',
    swatches: ['#0967D2', '#3F9142', '#FFC107'],
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
    },
  },
  {
    id: 'forest',
    name: '森林绿',
    description: '沉稳、自然的长时学习氛围',
    swatches: ['#047857', '#84CC16', '#F59E0B'],
    brand: {
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B',
    },
    accent: {
      50: '#F7FEE7',
      100: '#ECFCCB',
      200: '#D9F99D',
      300: '#BEF264',
      400: '#A3E635',
      500: '#84CC16',
      600: '#65A30D',
      700: '#4D7C0F',
      800: '#3F6212',
      900: '#365314',
    },
    warm: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
  },
  {
    id: 'sunset',
    name: '日落橙',
    description: '更有活力的练习与打卡感',
    swatches: ['#EA580C', '#E11D48', '#FACC15'],
    brand: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
    accent: {
      50: '#FFF1F2',
      100: '#FFE4E6',
      200: '#FECDD3',
      300: '#FDA4AF',
      400: '#FB7185',
      500: '#F43F5E',
      600: '#E11D48',
      700: '#BE123C',
      800: '#9F1239',
      900: '#881337',
    },
    warm: {
      50: '#FEFCE8',
      100: '#FEF9C3',
      200: '#FEF08A',
      300: '#FDE047',
      400: '#FACC15',
      500: '#EAB308',
      600: '#CA8A04',
      700: '#A16207',
      800: '#854D0E',
      900: '#713F12',
    },
  },
  {
    id: 'orchid',
    name: '兰紫',
    description: '轻盈、有记忆点的课程界面',
    swatches: ['#7C3AED', '#DB2777', '#F59E0B'],
    brand: {
      50: '#F5F3FF',
      100: '#EDE9FE',
      200: '#DDD6FE',
      300: '#C4B5FD',
      400: '#A78BFA',
      500: '#8B5CF6',
      600: '#7C3AED',
      700: '#6D28D9',
      800: '#5B21B6',
      900: '#4C1D95',
    },
    accent: {
      50: '#FDF2F8',
      100: '#FCE7F3',
      200: '#FBCFE8',
      300: '#F9A8D4',
      400: '#F472B6',
      500: '#EC4899',
      600: '#DB2777',
      700: '#BE185D',
      800: '#9D174D',
      900: '#831843',
    },
    warm: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
  },
  {
    id: 'graphite',
    name: '石墨蓝',
    description: '克制、偏工具感的高对比主题',
    swatches: ['#334155', '#0891B2', '#F97316'],
    brand: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    accent: {
      50: '#ECFEFF',
      100: '#CFFAFE',
      200: '#A5F3FC',
      300: '#67E8F9',
      400: '#22D3EE',
      500: '#06B6D4',
      600: '#0891B2',
      700: '#0E7490',
      800: '#155E75',
      900: '#164E63',
    },
    warm: {
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12',
    },
  },
  {
    id: 'sakura',
    name: '樱粉',
    description: '柔和、亲近的新手学习体验',
    swatches: ['#E11D48', '#0D9488', '#F59E0B'],
    brand: {
      50: '#FFF1F2',
      100: '#FFE4E6',
      200: '#FECDD3',
      300: '#FDA4AF',
      400: '#FB7185',
      500: '#F43F5E',
      600: '#E11D48',
      700: '#BE123C',
      800: '#9F1239',
      900: '#881337',
    },
    accent: {
      50: '#F0FDFA',
      100: '#CCFBF1',
      200: '#99F6E4',
      300: '#5EEAD4',
      400: '#2DD4BF',
      500: '#14B8A6',
      600: '#0D9488',
      700: '#0F766E',
      800: '#115E59',
      900: '#134E4A',
    },
    warm: {
      50: '#FFFBEB',
      100: '#FEF3C7',
      200: '#FDE68A',
      300: '#FCD34D',
      400: '#FBBF24',
      500: '#F59E0B',
      600: '#D97706',
      700: '#B45309',
      800: '#92400E',
      900: '#78350F',
    },
  },
]

export const getThemeOption = (themeId) => (
  themeOptions.find((option) => option.id === themeId) || themeOptions[0]
)

export const createTheme = (themeChoice = DEFAULT_THEME_ID) => {
  const selectedTheme = typeof themeChoice === 'string'
    ? getThemeOption(themeChoice)
    : themeChoice || themeOptions[0]

  return extendTheme({
    config: {
      initialColorMode: 'light',
      useSystemColorMode: false,
    },
    colors: {
      brand: selectedTheme.brand,
      accent: selectedTheme.accent,
      warm: selectedTheme.warm,
    },
    semanticTokens: {
      colors: {
        'app.bg': {
          default: 'gray.50',
          _dark: 'gray.900',
        },
        'app.surface': {
          default: 'white',
          _dark: 'gray.800',
        },
        'app.surfaceElevated': {
          default: 'white',
          _dark: 'gray.700',
        },
        'app.surfaceMuted': {
          default: 'gray.50',
          _dark: 'whiteAlpha.100',
        },
        'app.border': {
          default: 'gray.200',
          _dark: 'whiteAlpha.200',
        },
        'app.borderSubtle': {
          default: 'gray.100',
          _dark: 'whiteAlpha.200',
        },
        'app.text': {
          default: 'gray.800',
          _dark: 'whiteAlpha.900',
        },
        'app.textMuted': {
          default: 'gray.500',
          _dark: 'gray.400',
        },
        'app.navText': {
          default: 'gray.600',
          _dark: 'gray.300',
        },
        'app.activeBg': {
          default: 'brand.50',
          _dark: 'whiteAlpha.100',
        },
        'app.hoverBg': {
          default: 'gray.100',
          _dark: 'whiteAlpha.100',
        },
      },
    },
    fonts: {
      heading: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif`,
      body: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif`,
    },
    styles: {
      global: {
        body: {
          bg: 'app.bg',
          color: 'app.text',
        },
      },
    },
    components: {
      Button: {
        baseStyle: {
          borderRadius: 'xl',
          fontWeight: 'semibold',
          _active: {
            transform: 'scale(0.98)',
          },
        },
        sizes: {
          lg: {
            h: '56px',
            fontSize: 'lg',
            px: '32px',
          },
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
            },
          },
          success: {
            bg: 'accent.500',
            color: 'white',
            _hover: {
              bg: 'accent.600',
            },
          },
        },
      },
      Card: {
        baseStyle: {
          container: {
            bg: 'app.surface',
            borderColor: 'app.borderSubtle',
            borderWidth: '1px',
            borderRadius: '2xl',
            boxShadow: 'lg',
          },
        },
      },
    },
    breakpoints: {
      sm: '320px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  })
}

export default createTheme()
