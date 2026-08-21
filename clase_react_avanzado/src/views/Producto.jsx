import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AccessibilityContext } from '../context/AccessibilityContext'
import { getProducto } from '../services/firebaseProductos'
import { updateProducto } from '../services/firebaseProductos'

const Producto = () => {
    const { isHighContrast } = useContext(AccessibilityContext)
    const { id } = useParams()
    const [producto, setProducto] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isBuying, setIsBuying] = useState(false)
    const [message, setMessage] = useState('')

    useEffect(() => {
        const loadProducto = async () => {
            setIsLoading(true)
            const data = await getProducto(id)
            setProducto(data || null)
            setIsLoading(false)
            setMessage('')
        }

        loadProducto()
    }, [id])

    const handleBuy = async () => {
        if (!producto || producto.stock <= 0 || isBuying) {
            return
        }

        setIsBuying(true)
        setMessage('')

        const updated = await updateProducto({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            stock: Number(producto.stock) - 1,
        })

        if (!updated) {
            setMessage('No se pudo procesar la compra.')
            setIsBuying(false)
            return
        }

        setProducto(updated)
        setMessage('Compra solicitada. Se desconto 1 unidad de stock.')
        setIsBuying(false)
    }

    return (
        <section className="view">
            <h2>Producto Elegido </h2>
            <p className="status-badge">
                Modo de accesibilidad: {isHighContrast ? 'Alto contraste' : 'Normal'}
            </p>

            {isLoading ? <p>Cargando producto...</p> : null}

            {!isLoading && !producto ? (
                <p>
                    Detalles del producto: <strong>Producto no encontrado</strong>
                </p>
            ) : null}

            {!isLoading && producto ? (
                <div>
                    <p>
                        Nombre: <strong>{producto.nombre}</strong>
                    </p>
                    <p>
                        Precio: <strong>{producto.precio}</strong>
                    </p>
                    <p>
                        Stock: <strong>{producto.stock}</strong>
                    </p>
                    <button
                        type="button"
                        className="button"
                        onClick={handleBuy}
                        disabled={isBuying || Number(producto.stock) <= 0}
                    >
                        {isBuying ? 'Procesando...' : 'Comprar'}
                    </button>
                    {Number(producto.stock) <= 0 ? <p className="error">Sin stock.</p> : null}
                    {message ? <p>{message}</p> : null}
                </div>
            ) : null}

            <Link to="/productos">Volver al listado</Link>
        </section>
    )
}

export { Producto }