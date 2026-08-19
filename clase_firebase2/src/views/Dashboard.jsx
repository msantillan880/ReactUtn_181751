import { useEffect, useState } from 'react'
import {
    createProducto,
    deleteProducto,
    subscribeProductos,
    updateProducto,
} from '../services/firebaseProductos'

const initialForm = {
    nombre: '',
    precio: '',
    stock: '',
}

const Dashboard = () => {
    const [productos, setProductos] = useState([])
    const [formData, setFormData] = useState(initialForm)
    const [editId, setEditId] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState('')

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

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData(initialForm)
        setEditId('')
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setIsSaving(true)

        const payload = {
            nombre: formData.nombre.trim(),
            precio: Number(formData.precio),
            stock: Number(formData.stock),
        }

        if (!payload.nombre || Number.isNaN(payload.precio) || Number.isNaN(payload.stock)) {
            setError('Completa nombre, precio y stock con valores validos.')
            setIsSaving(false)
            return
        }

        const response = editId
            ? await updateProducto({ id: editId, ...payload })
            : await createProducto(payload)

        if (!response) {
            setError('No se pudo guardar el producto.')
            setIsSaving(false)
            return
        }

        resetForm()
        setIsSaving(false)
    }

    const handleEdit = (producto) => {
        setEditId(producto.id)
        setFormData({
            nombre: producto.nombre ?? '',
            precio: String(producto.precio ?? ''),
            stock: String(producto.stock ?? ''),
        })
    }

    const handleDelete = async (id) => {
        const shouldDelete = window.confirm('Estas seguro de eliminar este producto?')
        if (!shouldDelete) {
            return
        }

        const ok = await deleteProducto(id)
        if (!ok) {
            setError('No se pudo eliminar el producto.')
            return
        }

        if (editId === id) {
            resetForm()
        }

    }

    return (
        <section className="view">
            <h2>Dashboard - ABM de productos</h2>
            <p>Gestion de la coleccion productos en Firebase.</p>

            <form className="form" onSubmit={handleSubmit}>
                <label className="field" htmlFor="producto-nombre">
                    Nombre
                </label>
                <input
                    id="producto-nombre"
                    name="nombre"
                    className="input"
                    type="text"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                />

                <label className="field" htmlFor="producto-precio">
                    Precio
                </label>
                <input
                    id="producto-precio"
                    name="precio"
                    className="input"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.precio}
                    onChange={handleChange}
                    required
                />

                <label className="field" htmlFor="producto-stock">
                    Stock
                </label>
                <input
                    id="producto-stock"
                    name="stock"
                    className="input"
                    type="number"
                    min="0"
                    step="1"
                    value={formData.stock}
                    onChange={handleChange}
                    required
                />

                {error ? <p className="error">{error}</p> : null}

                <div className="actions">
                    <button type="submit" className="button" disabled={isSaving}>
                        {isSaving
                            ? 'Guardando...'
                            : editId
                                ? 'Actualizar producto'
                                : 'Crear producto'}
                    </button>
                    {editId ? (
                        <button
                            type="button"
                            className="button button--secondary"
                            onClick={resetForm}
                        >
                            Cancelar edicion
                        </button>
                    ) : null}
                </div>
            </form>

            <h3 className="subheading">Listado actual</h3>
            {isLoading ? <p>Cargando productos...</p> : null}
            {!isLoading && productos.length === 0 ? <p>No hay productos cargados.</p> : null}

            {!isLoading && productos.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.id}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <div className="row-actions">
                                        <button
                                            type="button"
                                            className="button button--small"
                                            onClick={() => handleEdit(producto)}
                                        >
                                            Editar
                                        </button>
                                        <button
                                            type="button"
                                            className="button button--small button--danger"
                                            onClick={() => handleDelete(producto.id)}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </section>
    )
}

export { Dashboard }