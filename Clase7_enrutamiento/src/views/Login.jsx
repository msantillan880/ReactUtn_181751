import { Navigate, useLocation, useNavigate } from 'react-router-dom'

const Login = ({ isAuthenticated, onLogin }) => {
    const location = useLocation()
    const navigate = useNavigate()

    const redirectPath = location.state?.from?.pathname || '/dashboard'

    const handleLogin = () => {
        onLogin()
        navigate(redirectPath, { replace: true })
    }

    if (isAuthenticated) {
        return <Navigate to={redirectPath} replace />
    }

    return (
        <section className="view">
            <h2>Login</h2>
            <p>
                Esta pantalla simula autenticacion. Al iniciar sesion, vuelves a la ruta
                que intentaste abrir.
            </p>
            <button type="button" className="button" onClick={handleLogin}>
                Iniciar sesion
            </button>
        </section>
    )
}

export { Login }