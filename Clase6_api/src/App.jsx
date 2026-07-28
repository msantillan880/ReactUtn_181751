import Usuarios from './components/Usuarios'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import './styles/App.css'

function App() {
  return (
    <main className="app">
      <Header />

      <Usuarios />
      <Footer />
    </main>
  )
}

export default App
