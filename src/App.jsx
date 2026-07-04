import "./App.css"
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { Tarjeta } from "./components/Tarjeta.jsx"
import { tarjetas } from "./data/mock.js"

const App = () => {
  return (
    <section className="app">
      <Header />
      <main className="cards-container">
        {tarjetas.map((tarjeta) => (
          <Tarjeta key={tarjeta.nombre} tarjeta={tarjeta} />
        ))}
      </main>
      <Footer />
    </section>
  )
}

export default App