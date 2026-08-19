import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <section className="view">
            <h2>Error 404</h2>
            <p>La pagina que buscas no existe.</p>
            <Link to="/">Ir al inicio</Link>
        </section>
    )
}

export { NotFound }