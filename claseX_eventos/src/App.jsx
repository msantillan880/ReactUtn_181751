import './styles/App.css'
import { useState } from 'react'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { FormularioEventos } from './components/FormularioEventos.jsx'
import { FormularioHook } from './components/FormularioHook.jsx'

const App = () => {
  const [vista, setVista] = useState('nativa')

  return (
    <section className="app">
      <Header />
      <main className="main">
        <section className="controles" aria-label="Selector de version del formulario">
          <button
            type="button"
            className={vista === 'nativa' ? 'control-btn control-btn--active' : 'control-btn'}
            onClick={() => setVista('nativa')}
          >
            Version obligatoria (eventos)
          </button>
          <button
            type="button"
            className={vista === 'hook' ? 'control-btn control-btn--active' : 'control-btn'}
            onClick={() => setVista('hook')}
          >
            Version opcional (react-hook-form)
          </button>
        </section>

        {vista === 'nativa' ? <FormularioEventos /> : <FormularioHook />}
      </main>
      <Footer />
    </section>
  )
}

export default App