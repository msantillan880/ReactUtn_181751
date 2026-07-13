import "./App.css"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { TaskItem } from "./components/TaskItem.jsx"
import { useLocalStorage } from "./hooks/useLocalStorage.js"

const initialTasks = [
  { id: 1, titulo: "Estudiar JavaScript", completada: true },
  { id: 2, titulo: "Practicar Promesas", completada: false },
  { id: 3, titulo: "Subir repositorio", completada: true },
]

const App = () => {
  const [tasks, setTasks] = useLocalStorage("clase5-tareas", initialTasks)
  const [title, setTitle] = useState("")
  const [search, setSearch] = useState("")
  const inputTaskRef = useRef(null)

  useEffect(() => {
    inputTaskRef.current?.focus()
  }, [])

  useEffect(() => {
    document.title = `Tareas totales: ${tasks.length}`
  }, [tasks])

  const addTask = useCallback(() => {
    const newTitle = title.trim()

    if (!newTitle) {
      return
    }

    setTasks((prevTasks) => {
      const nextId = prevTasks.length > 0 ? Math.max(...prevTasks.map((task) => task.id)) + 1 : 1

      return [{ id: nextId, titulo: newTitle, completada: false }, ...prevTasks]
    })

    setTitle("")
    inputTaskRef.current?.focus()
  }, [title, setTasks])

  const toggleTask = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completada: !task.completada } : task,
      ),
    )
  }, [setTasks])

  const removeTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }, [setTasks])

  const filteredTasks = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    if (!normalizedSearch) {
      return tasks
    }

    return tasks.filter((task) => task.titulo.toLowerCase().includes(normalizedSearch))
  }, [tasks, search])

  const completedCount = useMemo(
    () => tasks.filter((task) => task.completada).length,
    [tasks],
  )
  const pendingCount = tasks.length - completedCount

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      addTask()
    }
  }

  return (
    <section className="app">
      <Header />
      <main className="tasks-container">
        <div className="panel">
          <h2>Nueva tarea</h2>

          <div className="inline-controls">
            <input
              ref={inputTaskRef}
              type="text"
              className="input"
              placeholder="Ingrese una tarea"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onKeyDown={handleInputKeyDown}
            />
            <button className="btn" onClick={addTask}>Agregar</button>
          </div>

          <div className="inline-controls">
            <input
              type="text"
              className="input"
              placeholder="Buscar por titulo"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <p className="summary">
            Totales: {tasks.length} | Completadas: {completedCount} | Pendientes: {pendingCount}
          </p>
        </div>

        <div className="panel">
          <h2>Lista de tareas</h2>

          {filteredTasks.length === 0 ? (
            <p className="empty">No hay tareas para mostrar.</p>
          ) : (
            <ul className="task-list">
              {filteredTasks.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={removeTask} />
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </section>
  )
}

export default App