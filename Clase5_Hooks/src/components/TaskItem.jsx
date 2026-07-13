const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <li className="task-item">
            <div>
                <p className={`task-title ${task.completada ? "task-title--done" : ""}`}>{task.titulo}</p>
                <small className="task-meta">ID: {task.id}</small>
            </div>

            <div className="task-actions">
                <button className="btn" onClick={() => onToggle(task.id)}>
                    {task.completada ? "Marcar pendiente" : "Marcar completada"}
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
                    Eliminar
                </button>
            </div>
        </li>
    )
}

export { TaskItem }
