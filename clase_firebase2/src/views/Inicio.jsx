import { useNavigate } from 'react-router-dom'
import { app, db } from '../firebase/firebaseConfig'

const Inicio = () => {
    const navigate = useNavigate()
    // solo para validar la conexión con Firebase.
    console.log(app)
    console.log(app.options.projectId)
    console.log(app.options.storageBucket)
    console.log(db)
    /* const goToProductoDestacado = () => {
        navigate('/producto/104')
    } */

    return (
        <section className="view">
            <h2>Inicio</h2>
            <p>
                Mi primer CRUD en Firestore. </p>

            <ul>
                <li> <strong> Solo los usuarios autorizados (admin) podrán crear, modificar y eliminar productos.
                    Para esto necesitan estar logueados.</strong></li>
                <li> <strong> Los usuarios no autorizados (clientes)solo podrán ver el listado de productos y realizar compras.</strong></li>
            </ul>
            <p>
                Firebase conectado: proyecto <strong>{app.options.projectId}</strong> (app:
                <strong> {app.name}</strong>).
            </p>
            <p>Mis credenciales:</p>
            <ul>
                <li>Email: <strong>prueba.usuario1.bookmarksutn@gmail.com</strong></li>
                <li>Contraseña: <strong>pepe1234</strong></li>
            </ul>
        </section>
    )
}

export { Inicio }
