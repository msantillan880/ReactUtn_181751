import { useEffect, useRef, useState } from 'react'

const FormularioEventos = () => {
    const [formData, setFormData] = useState({ nombre: '', email: '' })
    const [campoActivo, setCampoActivo] = useState('nombre')
    const [mensajeEnter, setMensajeEnter] = useState('')
    const [botonHover, setBotonHover] = useState(false)
    const [ultimoEnvio, setUltimoEnvio] = useState(null)
    const nombreInputRef = useRef(null)
    const clearTimerRef = useRef(null)

    useEffect(() => {
        return () => {
            if (clearTimerRef.current) {
                clearTimeout(clearTimerRef.current)
            }
        }
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))
        console.log(`onChange -> ${name}:`, value)
    }

    const handleFocus = (event) => {
        const nombreCampo = event.target.name
        setCampoActivo(nombreCampo)
        console.log(`onFocus -> campo activo: ${nombreCampo}`)
    }

    const handleBlur = (event) => {
        const nombreCampo = event.target.name
        setCampoActivo('ninguno')
        console.log(`onBlur -> ${nombreCampo} perdio el foco`)
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setMensajeEnter('Se detecto Enter dentro del campo nombre.')
            console.log('onKeyDown -> Enter detectado en nombre')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log('onSubmit -> datos enviados:', formData)
        setUltimoEnvio(formData)
        setMensajeEnter('')

        if (clearTimerRef.current) {
            clearTimeout(clearTimerRef.current)
        }

        clearTimerRef.current = setTimeout(() => {
            setFormData({ nombre: '', email: '' })
            setUltimoEnvio(null)
            setCampoActivo('nombre')
            nombreInputRef.current?.focus()
        }, 1500)
    }

    const etiquetaCampo = {
        nombre: 'Nombre',
        email: 'Correo electronico',
        ninguno: 'Ninguno',
    }

    return (
        <section className="panel panel--native">
            <h2>Formulario controlado con eventos nativos de React</h2>
            <p className="panel__desc">
                Incluye onChange, onFocus, onBlur, onSubmit, onKeyDown, onMouseEnter y
                onMouseLeave.
            </p>

            <form className="formulario" onSubmit={handleSubmit}>
                <label htmlFor="nombre">Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    ref={nombreInputRef}
                    autoFocus
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    placeholder="Ej: Marcelo"
                    required
                />

                <label htmlFor="email">Correo electronico</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder="nombre@correo.com"
                    required
                />

                <button
                    type="submit"
                    className={botonHover ? 'btn btn--hover' : 'btn'}
                    onMouseEnter={() => setBotonHover(true)}
                    onMouseLeave={() => setBotonHover(false)}
                >
                    Enviar formulario
                </button>
            </form>

            <div className="estado">
                <p>
                    Campo activo: <strong>{etiquetaCampo[campoActivo]}</strong>
                </p>
                {mensajeEnter && <p className="estado__ok">{mensajeEnter}</p>}
                {ultimoEnvio && (
                    <p className="estado__ok">
                        Ultimo envio: {ultimoEnvio.nombre} ({ultimoEnvio.email})
                    </p>
                )}
            </div>
        </section>
    )
}

export { FormularioEventos }
