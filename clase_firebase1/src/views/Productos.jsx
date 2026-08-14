import { Link, useSearchParams } from 'react-router-dom'
import { PRODUCTOS } from '../data/productos'

const Productos = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const q = searchParams.get('q') ?? ''

    const productosFiltrados = PRODUCTOS.filter((item) =>
        item.nombre.toLowerCase().includes(q.toLowerCase()),
    )

    const handleChange = (event) => {
        const valor = event.target.value
        if (valor.trim()) {
            setSearchParams({ q: valor })
            return
        }
        setSearchParams({})
    }

    return (
        <section className="view">
            <h2>Productos</h2>
            <p>Filtro por query param usando useSearchParams.</p>

            <label className="field" htmlFor="filtro-productos">
                Buscar por nombre:
            </label>
            <input
                id="filtro-productos"
                className="input"
                type="text"
                placeholder="Ej: monitor"
                value={q}
                onChange={handleChange}
            />

            <p className="results">Resultados: {productosFiltrados.length}</p>

            <ul className="list">
                {productosFiltrados.map((item) => (
                    <li key={item.id}>
                        <Link to={`/producto/${item.id}`}>{item.nombre}</Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export { Productos }