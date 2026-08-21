import { createContext, useEffect, useMemo, useState } from 'react'

const AccessibilityContext = createContext(undefined)

const STORAGE_KEY = 'accessibility-contrast-mode'

const getInitialMode = () => {
    const savedMode = localStorage.getItem(STORAGE_KEY)
    if (savedMode === 'high' || savedMode === 'normal') {
        return savedMode
    }
    return 'normal'
}

const AccessibilityProvider = ({ children }) => {
    const [contrastMode, setContrastMode] = useState(getInitialMode)

    useEffect(() => {
        document.documentElement.setAttribute('data-contrast', contrastMode)
        localStorage.setItem(STORAGE_KEY, contrastMode)
    }, [contrastMode])

    const toggleContrastMode = () => {
        setContrastMode((currentMode) =>
            currentMode === 'normal' ? 'high' : 'normal',
        )
    }

    const value = useMemo(
        () => ({
            contrastMode,
            isHighContrast: contrastMode === 'high',
            toggleContrastMode,
        }),
        [contrastMode],
    )

    return (
        <AccessibilityContext.Provider value={value}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export { AccessibilityContext, AccessibilityProvider }