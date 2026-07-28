function UsuarioCard({ usuario }) {
    return (
        <li className="usuario-card">
            <h2>{usuario.name}</h2>
            <p>
                <strong>Email:</strong> {usuario.email}
            </p>
            <p>
                <strong>Empresa:</strong> {usuario.company?.name || 'Sin dato'}
            </p>
        </li>
    )
}

export default UsuarioCard