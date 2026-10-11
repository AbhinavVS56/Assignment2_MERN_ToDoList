
import TaskItem from "./TaskItem";

function TaskList({ tasks, onToggle, onDelete, busy }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet.</p>
        <span>Add your first task above to get started.</span>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          busy={busy}
        />
      ))}
    </ul>
  );
}

export default TaskList;
