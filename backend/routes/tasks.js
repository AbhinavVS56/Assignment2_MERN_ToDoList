
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../Models/Task");

const router = express.Router();

// GET /api/tasks - Fetch all tasks.
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks." });
  }
});

// POST /api/tasks - Create a new task.
router.post("/", async (req, res) => {
  try {
    // Convert the title to a string and remove extra spaces.
    const title = String(req.body.title ?? "").trim();

    if (!title) {
      return res.status(400).json({
        message: "Task title cannot be empty.",
      });
    }

    const task = await Task.create({ title });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create task.",
    });
  }
});

// PUT /api/tasks/:id - Update a title or completion status.
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const updates = {};

    // Validate a new title if one was supplied.
    if (Object.hasOwn(req.body, "title")) {
      const title = String(req.body.title ?? "").trim();

      if (!title) {
        return res.status(400).json({
          message: "Task title cannot be empty.",
        });
      }

      updates.title = title;
    }

    // Accept only a real Boolean for completion status.
    if (Object.hasOwn(req.body, "completed")) {
      if (typeof req.body.completed !== "boolean") {
        return res.status(400).json({
          message: "Completed must be a Boolean.",
        });
      }

      updates.completed = req.body.completed;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "Provide a title or completed status to update.",
      });
    }

    const task = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update task." });
  }
});

// DELETE /api/tasks/:id - Delete a task.
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid task ID." });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    return res.status(200).json({
      message: "Task deleted successfully.",
      task,
    });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete task." });
  }
});

module.exports = router;
