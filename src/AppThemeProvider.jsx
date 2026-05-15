import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { createTheme, DEFAULT_THEME_ID, getThemeOption, themeOptions } from './theme'

const STORAGE_KEY = 'lingolearn_theme'

const AppThemeContext = createContext(null)

const readStoredThemeId = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME_ID
  }

  const storedThemeId = window.localStorage.getItem(STORAGE_KEY)
  return getThemeOption(storedThemeId).id
}

export const AppThemeProvider = ({ children }) => {
  const [themeId, setThemeIdState] = useState(readStoredThemeId)

  const activeTheme = useMemo(() => getThemeOption(themeId), [themeId])
  const chakraTheme = useMemo(() => createTheme(activeTheme), [activeTheme])

  const setThemeId = useCallback((nextThemeId) => {
    const nextTheme = getThemeOption(nextThemeId)

    setThemeIdState(nextTheme.id)

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextTheme.id)
    }
  }, [])

  const value = useMemo(() => ({
    activeTheme,
    setThemeId,
    themeId,
    themeOptions,
  }), [activeTheme, setThemeId, themeId])

  return (
    <AppThemeContext.Provider value={value}>
      <ChakraProvider theme={chakraTheme}>
        {children}
      </ChakraProvider>
    </AppThemeContext.Provider>
  )
}

export const useAppTheme = () => {
  const context = useContext(AppThemeContext)

  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider')
  }

  return context
}
