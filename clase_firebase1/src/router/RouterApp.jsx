import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from '../components/MainLayout'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { Contacto } from '../views/Contacto'
import { Dashboard } from '../views/Dashboard'
import { Inicio } from '../views/Inicio'
import { Login } from '../views/Login'
import { Nosotros } from '../views/Nosotros'
import { Producto } from '../views/Producto'
import { Productos } from '../views/Productos'
import { NotFound } from '../views/NotFound'

const RouterApp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const handleLogin = () => setIsAuthenticated(true)
    const handleLogout = () => setIsAuthenticated(false)

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    element={
                        <MainLayout
                            isAuthenticated={isAuthenticated}
                            onLogout={handleLogout}
                        />
                    }
                >
                    <Route index element={<Inicio />} />
                    <Route path="nosotros" element={<Nosotros />} />
                    <Route path="contacto" element={<Contacto />} />
                    <Route path="productos" element={<Productos />} />
                    <Route path="producto/:id" element={<Producto />} />
                    <Route
                        path="login"
                        element={
                            <Login isAuthenticated={isAuthenticated} onLogin={handleLogin} />
                        }
                    />
                    <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export { RouterApp }