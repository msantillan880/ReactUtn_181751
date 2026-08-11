import { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const FormularioHook = () => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nombre: '',
            email: '',
        },
    })

    const [campoActivo, setCampoActivo] = useState('ninguno')
    const [botonHover, setBotonHover] = useState(false)
    const [mensajeEnter, setMensajeEnter] = useState('')
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

    const onSubmit = (data) => {
        console.log('onSubmit (react-hook-form) -> datos enviados:', data)
        setUltimoEnvio(data)
        setMensajeEnter('')

        if (clearTimerRef.current) {
            clearTimeout(clearTimerRef.current)
        }

        clearTimerRef.current = setTimeout(() => {
            reset({ nombre: '', email: '' })
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
        <section className="panel panel--hook">
            <h2>Version opcional con react-hook-form</h2>
            <p className="panel__desc">
                Misma interfaz, menos manejo manual de estado y validaciones integradas.
            </p>

            <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="hook-nombre">Nombre</label>
                <Controller
                    name="nombre"
                    control={control}
                    rules={{ required: 'El nombre es obligatorio' }}
                    render={({ field }) => (
                        <input
                            id="hook-nombre"
                            type="text"
                            ref={nombreInputRef}
                            autoFocus
                            placeholder="Ej: Marcelo"
                            {...field}
                            value={field.value ?? ''}
                            onChange={(event) => {
                                field.onChange(event.target.value)
                                console.log('onChange (hook) -> nombre:', event.target.value)
                            }}
                            onFocus={() => {
                                setCampoActivo('nombre')
                                console.log('onFocus (hook) -> nombre')
                            }}
                            onBlur={(event) => {
                                field.onBlur()
                                setCampoActivo('ninguno')
                                console.log('onBlur (hook) -> nombre')
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    setMensajeEnter('Se detecto Enter dentro del campo nombre (hook).')
                                    console.log('onKeyDown (hook) -> Enter detectado en nombre')
                                }
                            }}
                        />
                    )}
                />
                {errors.nombre && <p className="estado__error">{errors.nombre.message}</p>}

                <label htmlFor="hook-email">Correo electronico</label>
                <Controller
                    name="email"
                    control={control}
                    rules={{
                        required: 'El email es obligatorio',
                        pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: 'Formato de email invalido',
                        },
                    }}
                    render={({ field }) => (
                        <input
                            id="hook-email"
                            type="email"
                            placeholder="nombre@correo.com"
                            {...field}
                            value={field.value ?? ''}
                            onChange={(event) => {
                                field.onChange(event.target.value)
                                console.log('onChange (hook) -> email:', event.target.value)
                            }}
                            onFocus={() => {
                                setCampoActivo('email')
                                console.log('onFocus (hook) -> email')
                            }}
                            onBlur={(event) => {
                                field.onBlur()
                                setCampoActivo('ninguno')
                                console.log('onBlur (hook) -> email')
                            }}
                        />
                    )}
                />
                {errors.email && <p className="estado__error">{errors.email.message}</p>}

                <button
                    type="submit"
                    className={botonHover ? 'btn btn--hover' : 'btn'}
                    onMouseEnter={() => setBotonHover(true)}
                    onMouseLeave={() => setBotonHover(false)}
                >
                    Enviar con hook
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

export { FormularioHook }
