import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import UsuarioCard from './UsuarioCard'
import '../styles/Usuarios.css'

const API_BASE = 'https://jsonplaceholder.typicode.com'
const MIN_LOADING_MS = 600

const esperar = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms)
})

function Usuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const [busqueda, setBusqueda] = useState('')
    const busquedaInputRef = useRef(null)

    const obtenerUsuarios = useCallback(async () => {
        setLoading(true)
        setError('')
        const esperaMinima = esperar(MIN_LOADING_MS)

        try {
            const response = await fetch(`${API_BASE}/users`, {
                method: 'GET'
            })

            if (!response.ok) {
                throw new Error(`Error HTTP ${response.status}: no se pudo obtener la lista de usuarios.`)
            }

            const data = await response.json()
            setUsuarios(data)
        } catch (err) {
            setUsuarios([])
            setError(err.message ||
                'Ocurrio un error inesperado al cargar usuarios.')
        } finally {
            await esperaMinima
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        obtenerUsuarios()
    }, [obtenerUsuarios])

    const usuariosFiltrados = useMemo(() => {
        const termino = busqueda.trim().toLowerCase()

        if (!termino) {
            return usuarios
        }

        return usuarios.filter((usuario) =>
            usuario.name.toLowerCase().includes(termino))
    }, [usuarios, busqueda])

    const handleRecargar = () => {
        setBusqueda('')
        obtenerUsuarios()
        busquedaInputRef.current?.focus()
    }

    return (
        <section className="usuarios">
            <div className="usuarios__tools">
                <label htmlFor="busqueda" className="usuarios__search-wrap">
                    Buscar por nombre
                    <input
                        ref={busquedaInputRef}
                        id="busqueda"
                        type="search"
                        placeholder="Ej: Graham"
                        value={busqueda}
                        onChange={(event) => setBusqueda(event.target.value)}
                    />
                </label>

                <button
                    type="button"
                    className="usuarios__reload"
                    onClick={handleRecargar}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Recargar'}
                </button>
            </div>

            {loading && <p className="usuarios__status">Cargando usuarios...</p>}

            {!loading && error && (
                <div className="usuarios__error" role="alert">
                    <p>{error}</p>
                </div>
            )}

            {!loading && !error && (
                <>
                    <p className="usuarios__meta">
                        Mostrando {usuariosFiltrados.length} de {usuarios.length} usuarios.
                    </p>

                    {usuariosFiltrados.length === 0 ? (
                        <p className="usuarios__status">No hay usuarios que coincidan con la busqueda.</p>
                    ) : (
                        <ul className="usuarios__list">
                            {usuariosFiltrados.map((usuario) => (
                                <UsuarioCard key={usuario.id} usuario={usuario} />
                            ))}
                        </ul>
                    )}
                </>
            )}
        </section>
    )
}

export default Usuarios