import { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { Footer } from './Footer'
import { Header } from './Header'

const MainLayout = () => {
    const { user, logout } = useContext(AuthContext)

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="app">
            <Header />

            <nav className="app__nav" aria-label="Navegacion principal">
                <NavLink to="/" end>
                    Inicio
                </NavLink>
                {/* <NavLink to="/nosotros">Nosotros</NavLink>
                <NavLink to="/contacto">Contacto</NavLink> */}
                <NavLink to="/productos">Lista productos</NavLink>
                <NavLink to="/dashboard">ABM productos</NavLink>
                {user ? (
                    <button type="button" className="app__link-button" onClick={handleLogout}>
                        Cerrar sesion
                    </button>
                ) : (
                    <NavLink to="/login">Login</NavLink>
                )}
            </nav>

            <main className="app__main">
                <Outlet />
            </main>

            <Footer />
        </div>
    )
}

export { MainLayout }