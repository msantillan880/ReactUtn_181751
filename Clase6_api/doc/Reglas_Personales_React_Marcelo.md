# Reglas Personales React (Marcelo)

Documento base para reutilizar en futuras tareas.

## 1) Estructura del proyecto

- Mantener una sola carpeta por tarea/proyecto (evitar carpeta anidada con el mismo nombre).
- `src/components/`: solo componentes `.jsx`.
- `src/styles/`: todos los archivos `.css`.
- `src/hooks/`: hooks personalizados.
- `src/services/`: llamadas a APIs y utilidades de red.
- `src/data/`: datos mock o constantes de apoyo.

## 2) Regla de estilos (obligatoria)

- No dejar archivos `.css` dentro de `components`.
- Cada componente importa su CSS desde `src/styles`.
- Mantener nombres de clases consistentes (ejemplo: `usuarios__item`, `app__header`).

## 3) Organización de componentes

- `App.jsx` funciona como layout principal.
- Encabezado y pie deben ir en componentes separados (`Header.jsx`, `Footer.jsx`).
- El texto del `Footer` debe quedar centrado por CSS.
- Evitar JSX muy largo en un solo archivo; dividir en componentes chicos.

## 4) Estado y lógica

- Usar `useState` para estado local.
- Usar `useEffect` para efectos (fetch inicial, subscripciones, etc.).
- Manejar siempre los 3 estados de API: `loading`, `error`, `data`.
- En solicitudes async, usar `try/catch/finally`.

## 5) Renderizado condicional (estándar)

- Si `loading` es `true`, mostrar mensaje de carga.
- Si `error` tiene valor, mostrar mensaje de error.
- Si hay datos, mostrar listado/contenido principal.

## 6) Buenas prácticas de UX

- Si existe botón de recarga, debe restaurar el estado esperado de la vista.
- En filtros de búsqueda, mostrar cantidad de resultados.
- Si no hay coincidencias, mostrar mensaje claro al usuario.

## 7) Calidad mínima antes de entregar

- Ejecutar `npm run build` y verificar que compile.
- Probar flujo principal en navegador (`npm run dev`).
- Verificar que la estructura de carpetas respete esta guía.

## 8) Convenciones de nombres

- Componentes: PascalCase (`Usuarios.jsx`, `UsuarioCard.jsx`).
- Variables y funciones: camelCase (`obtenerUsuarios`, `handleRecargar`).
- Clases CSS: estilo BEM simple (`bloque__elemento`).

## 9) README de cada tarea

Incluir como mínimo:

- Descripción corta del objetivo.
- Tecnologías usadas.
- Pasos de instalación y ejecución.
- Validación de requisitos del enunciado.
- Extras implementados (si aplica).
- Evidencias con enlaces a capturas (por ejemplo: vista completa y uso de filtro).

---

Ultima actualizacion: 2026-07-27
