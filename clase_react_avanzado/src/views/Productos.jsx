import { useContext, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AccessibilityContext } from '../context/AccessibilityContext'
import { subscribeProductos } from '../services/firebaseProductos'

const Productos = () => {
    const { isHighContrast } = useContext(AccessibilityContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const [productos, setProductos] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const q = searchParams.get('q') ?? ''

    useEffect(() => {
        setIsLoading(true)

        const unsubscribe = subscribeProductos(
            (data) => {
                setProductos(data)
                setIsLoading(false)
                setError('')
            },
            () => {
                setError('No se pudieron cargar los productos en tiempo real.')
                setIsLoading(false)
            },
        )

        return () => unsubscribe()
    }, [])

    const productosFiltrados = productos.filter((item) =>
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
            <p>Listado de productos desde Firebase.</p>
            <p className="status-badge">
                Modo de accesibilidad: {isHighContrast ? 'Alto contraste' : 'Normal'}
            </p>

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

            {isLoading ? <p>Cargando productos...</p> : null}
            {error ? <p className="error">{error}</p> : null}

            {!isLoading && !error ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosFiltrados.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Link to={`/producto/${item.id}`}>{item.nombre}</Link>
                                </td>
                                <td>{item.precio}</td>
                                <td>{item.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </section>
    )
}

export { Productos }