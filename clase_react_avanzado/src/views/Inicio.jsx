import { app, db } from '../firebase/firebaseConfig'

const Inicio = () => {
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
            <h3>
                Profesor, como consigna de la tarea elegi Tema (claro/oscuro) pero orientado a Accesibilidad.
            </h3>
            <p>
                Para una persona con dificultades visuales, lo indicado es el alto contraste, mientras que el modo claro u oscuro responde más a la estética o la luz ambiente, el alto contraste garantiza una diferencia de brillo estricta entre el texto y el fondo para que sea legible.
            </p>

            <p>  Propósito de la tarea: Utilizar Context API para compartir y consumir información global en una
                aplicación React, evitando el prop drilling y aplicando buenas prácticas.

            </p>

            <ul>
                <li>  Permisos: Solo los usuarios autorizados (admin) podrán crear, modificar y eliminar productos.
                    Para esto necesitan estar logueados.</li>
                <li> Los usuarios no autorizados (clientes)solo podrán ver el listado de productos y realizar compras.</li>
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
