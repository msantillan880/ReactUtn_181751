const Dashboard = () => {
    return (
        <section className="view">
            <h2>Dashboard protegido</h2>
            <p>
                Llegaste a una ruta protegida. Si no estas logueado, React Router te
                redirige a Login y despues vuelve aqui.
            </p>
        </section>
    )
}

export { Dashboard }