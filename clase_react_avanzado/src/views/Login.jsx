import { useContext, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
    const { user, login } = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const redirectPath = location.state?.from?.pathname || '/dashboard'

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)

        try {
            await login(formData.email, formData.password)
            navigate(redirectPath, { replace: true })
        } catch (authError) {
            setError('No se pudo iniciar sesion. Verifica email y password.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (user) {
        return <Navigate to={redirectPath} replace />
    }

    return (
        <section className="view">
            <h2>Login</h2>
            <p>Inicia sesion con tu usuario de Firebase Authentication.</p>

            <form className="form" onSubmit={handleLogin}>
                <label className="field" htmlFor="login-email">
                    Email
                </label>
                <input
                    id="login-email"
                    name="email"
                    className="input"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <label className="field" htmlFor="login-password">
                    Password
                </label>
                <input
                    id="login-password"
                    name="password"
                    className="input"
                    type="password"
                    autoComplete="current-password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {error ? <p className="error">{error}</p> : null}

                <button type="submit" className="button" disabled={isSubmitting}>
                    {isSubmitting ? 'Ingresando...' : 'Iniciar sesion'}
                </button>
            </form>
        </section>
    )
}

export { Login }