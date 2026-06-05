import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')       // 'dark' | 'light'
  const [persona, setPersona] = useState('emceedeep') // 'emceedeep' | 'infiniteloop'

  // Apply theme + persona to <html> data attributes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.setAttribute('data-persona', persona)
  }, [theme, persona])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  const togglePersona = () => setPersona(prev => prev === 'emceedeep' ? 'infiniteloop' : 'emceedeep')

  const isEmceeDeep = persona === 'emceedeep'
  const isDark = theme === 'dark'

  return (
    <ThemeContext.Provider value={{
      theme,
      persona,
      isDark,
      isEmceeDeep,
      toggleTheme,
      togglePersona,
      setPersona,
      setTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
