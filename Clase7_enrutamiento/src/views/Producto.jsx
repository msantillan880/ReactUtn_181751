import { Link, useParams } from 'react-router-dom'
import { PRODUCTOS } from '../data/productos'

const Producto = () => {
    const { id } = useParams()
    const producto = PRODUCTOS.find((item) => item.id === Number(id))

    return (
        <section className="view">
            <h2>Producto dinamico</h2>
            <p>
                Producto recibido por parametro de URL: <strong>{id}</strong>
            </p>
            <p>
                Nombre del producto:{' '}
                <strong>{producto?.nombre ?? 'Producto no encontrado'}</strong>
            </p>
            <Link to="/productos">Volver al listado</Link>
        </section>
    )
}

export { Producto }