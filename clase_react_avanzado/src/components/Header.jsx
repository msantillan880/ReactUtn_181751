import { useContext } from 'react'
import { AccessibilityContext } from '../context/AccessibilityContext'

const Header = () => {
  const { isHighContrast, toggleContrastMode } = useContext(AccessibilityContext)

  return (
    <header className="app__header">
      <div className="app__header-top">
        <div>
          <h1 className="app__eyebrow">React Avanzado</h1>
          <h2>Consulta y Abm de Productos</h2>
          <p className="app__description">React Avanzado (Contexto + Firebase).</p>
        </div>
        <button
          type="button"
          className="contrast-toggle"
          onClick={toggleContrastMode}
          aria-pressed={isHighContrast}
          aria-label={
            isHighContrast
              ? 'Cambiar de alto contraste a modo normal'
              : 'Cambiar de modo normal a alto contraste'
          }
        >
          <span className="contrast-toggle__icon" aria-hidden="true">
            ◐
          </span>
          <span>{isHighContrast ? 'Modo normal' : 'Alto contraste'}</span>
        </button>
      </div>
    </header>
  )
}

export { Header }