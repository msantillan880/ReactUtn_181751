# API REST en React - Listado de Usuarios

Aplicacion hecha con React + Vite para consumir la API publica de usuarios de JSONPlaceholder y mostrar el listado con manejo de estados de carga, error y datos.

## Funcionalidades

- Consumo de API REST con fetch y async/await.
- Manejo de estados con useState: usuarios, loading y error.
- useEffect para ejecutar la solicitud al montar el componente.
- Validacion de response.ok y manejo explicito de errores con try/catch.
- Renderizado condicional de estados: cargando, error y datos.
- Extra: boton Recargar para repetir la solicitud.
- Extra: buscador por nombre.
- Extra: componente hijo UsuarioCard para mostrar cada usuario.

## Validacion contra el enunciado

- En caso de exito: se guarda la respuesta en el estado usuarios y loading pasa a false (en finally).
- En caso de error: se limpia usuarios, se guarda el mensaje en error y loading pasa a false (en finally).
- Renderizado condicional:
  - Si loading es true, se muestra "Cargando usuarios...".
  - Si error tiene valor, se muestra el mensaje de error.
  - Si hay datos en usuarios, se renderiza una lista ul con nombre y correo de cada usuario (a traves de UsuarioCard).
- Extra opcional: boton "Recargar" implementado para volver a ejecutar la solicitud.

## Sobre useMemo en el filtro

useMemo no es estrictamente necesario para este caso puntual porque JSONPlaceholder devuelve pocos usuarios. Aun asi, puede quedarse por estos motivos:

- Evita recalcular el filtro en renders donde no cambian usuarios ni busqueda.
- Hace explicita la intencion de optimizar una operacion derivada.
- Facilita escalar si en el futuro la lista crece o el filtro se vuelve mas costoso.

Si se prioriza simplicidad absoluta del codigo, tambien es valido removerlo y calcular usuariosFiltrados directamente en cada render.

## API utilizada

- Endpoint: https://jsonplaceholder.typicode.com/users

## Instalacion y ejecucion

1. Clonar el repositorio.
2. Entrar en la carpeta del proyecto (donde esta package.json).
3. Instalar dependencias:

```bash
npm install
```

4. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Capturas sugeridas para la entrega

- Estado cargando: mensaje "Cargando usuarios...".
- Estado error: mensaje de error (simulable desconectando internet o alterando la URL).
- Estado datos: lista de usuarios renderizada.

## Evidencias de esta entrega

- Vista completa: [apiPantallaCompleta.png](apiPantallaCompleta.png)
- Uso del filtro: [apiUsoFiltro.png](apiUsoFiltro.png)

## Caso de error

Lo que se ve en la captura:

Cambie API a una URL inválida.

- Vista de API_BASE modificado: [apiCreeError.png](apiCreeError.png)
  Entró al catch.
  Se guardó el mensaje en error.
  loading volvió a false.
  Se renderizó el bloque de error.
- Vista completa: [apiErrorBrowser.png](apiErrorBrowser.png)

## Creditos del autor

- Estudiante: Santillan Marcelo
- Curso: React UTN - Modulo 2
- Unidad: Unidad 2 - API REST
