
function TaskItem({ task, onToggle, onDelete, busy }) {
  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <label className="task-label">
        <input
          type="checkbox"
          checked={task.completed}
          disabled={busy}
          onChange={() => onToggle(task)}
          aria-label={`Mark ${task.title} ${
            task.completed ? "incomplete" : "complete"
          }`}
        />

        <span>{task.title}</span>
      </label>

      <button
        type="button"
        className="delete-button"
        onClick={() => onDelete(task._id)}
        disabled={busy}
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
