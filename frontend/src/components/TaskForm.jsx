
import { useState } from "react";

function TaskForm({ onAddTask, busy }) {
  const [title, setTitle] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle || busy) return;

    const success = await onAddTask(trimmedTitle);

    if (success) {
      setTitle("");
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to get done?"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        maxLength={200}
        aria-label="New task title"
        required
      />

      <button type="submit" disabled={busy || !title.trim()}>
        Add task
      </button>
    </form>
  );
}

export default TaskForm;
