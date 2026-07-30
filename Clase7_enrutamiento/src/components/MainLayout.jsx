import { NavLink, Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'

const MainLayout = ({ isAuthenticated, onLogout }) => {
    return (
        <div className="app">
            <Header />

            <nav className="app__nav" aria-label="Navegacion principal">
                <NavLink to="/" end>
                    Inicio
                </NavLink>
                <NavLink to="/nosotros">Nosotros</NavLink>
                <NavLink to="/contacto">Contacto</NavLink>
                <NavLink to="/productos">Productos</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                {isAuthenticated ? (
                    <button type="button" className="app__link-button" onClick={onLogout}>
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