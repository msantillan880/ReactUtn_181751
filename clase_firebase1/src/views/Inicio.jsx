import { useNavigate } from 'react-router-dom'
import { app } from '../firebase/FirebaseConfig'

const Inicio = () => {
    const navigate = useNavigate()

    const goToProductoDestacado = () => {
        navigate('/producto/104')
    }

    return (
        <section className="view">
            <h2>Inicio</h2>
            <p>
                Este mini dashboard practica rutas publicas y protegidas con React Router.
            </p>
            <p>
                Firebase conectado: proyecto <strong>{app.options.projectId}</strong> (app:
                <strong> {app.name}</strong>).
            </p>
            <button type="button" className="button" onClick={goToProductoDestacado}>
                Ir al producto destacado (useNavigate)
            </button>
        </section>
    )
}

export { Inicio }
