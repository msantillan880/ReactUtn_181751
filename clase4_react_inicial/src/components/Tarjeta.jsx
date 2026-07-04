const Tarjeta = ({ tarjeta }) => {
  const { nombre, profesion, imagen, descripcion, ajusteImagen } = tarjeta

  return (
    <article className="card">
      <img
        src={imagen}
        alt={`Foto de ${nombre}, ${profesion}`}
        className={`card-image ${ajusteImagen === "contain" ? "card-image--contain" : ""}`}
      />
      <div className="card-content">
        <h2>{nombre}</h2>
        <h3>{profesion}</h3>
        <p>{descripcion}</p>
      </div>
    </article>
  )
}

export { Tarjeta }