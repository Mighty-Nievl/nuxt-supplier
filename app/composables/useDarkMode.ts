export const useDarkMode = () => {
  const isDark = useState('darkMode', () => false)

  // Initialize dark mode from localStorage
  const initDarkMode = () => {
    if (process.client) {
      const stored = localStorage.getItem('darkMode')
      if (stored !== null) {
        isDark.value = stored === 'true'
      } else {
        // Check system preference
        isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      applyDarkMode()
    }
  }

  // Apply dark mode class to document
  const applyDarkMode = () => {
    if (process.client) {
      if (isDark.value) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
    if (process.client) {
      localStorage.setItem('darkMode', isDark.value.toString())
      applyDarkMode()
    }
  }

  // Set dark mode
  const setDarkMode = (value: boolean) => {
    isDark.value = value
    if (process.client) {
      localStorage.setItem('darkMode', value.toString())
      applyDarkMode()
    }
  }

  return {
    isDark: readonly(isDark),
    toggleDarkMode,
    setDarkMode,
    initDarkMode
  }
}
