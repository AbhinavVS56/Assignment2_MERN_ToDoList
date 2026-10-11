
import { useCallback, useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // GET: fetch all tasks when the application loads.
  const fetchTasks = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Could not load tasks.");
      }

      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // POST: create a task and update the React state.
  async function addTask(title) {
    setBusy(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not add task.");
      }

      setTasks((current) => [data, ...current]);
      return true;
    } catch (err) {
      setError(err.message || "Unable to add task.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  // PUT: toggle completion status.
  async function toggleTask(task) {
    setBusy(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update task.");
      }

      setTasks((current) =>
        current.map((item) => (item._id === data._id ? data : item))
      );
    } catch (err) {
      setError(err.message || "Unable to update task.");
    } finally {
      setBusy(false);
    }
  }

  // DELETE: remove the task from MongoDB and the screen.
  async function deleteTask(id) {
    setBusy(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete task.");
      }

      setTasks((current) => current.filter((task) => task._id !== id));
    } catch (err) {
      setError(err.message || "Unable to delete task.");
    } finally {
      setBusy(false);
    }
  }

  const completedCount = tasks.filter((task) => task.completed).length;

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header className="app-header">
          <p className="eyebrow">YOUR DAILY WORKSPACE</p>
          <h1>My To-Do List</h1>
          <p className="subtitle">
            Small steps. Big progress.
          </p>
        </header>

        <TaskForm onAddTask={addTask} busy={busy} />

        {error && (
          <div className="error-message" role="alert">
            {error}
            <button type="button" onClick={fetchTasks}>
              Retry
            </button>
          </div>
        )}

        <div className="list-heading">
          <h2>Your tasks</h2>
          <span>
            {completedCount} of {tasks.length} completed
          </span>
        </div>

        {loading ? (
          <p className="status-message">Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            busy={busy}
          />
        )}

        <footer className="app-footer">
          Saved to MongoDB · MERN Stack
        </footer>
      </section>
    </main>
  );
}

export default App;
