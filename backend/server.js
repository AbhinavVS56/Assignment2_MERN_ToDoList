
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Permit requests only from the Vite frontend.
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Parse JSON request bodies.
app.use(express.json());

// A simple endpoint to check whether the server is running.
app.get("/", (req, res) => {
  res.json({ message: "MERN To-Do API is running." });
});

// Register the task endpoints.
app.use("/api/tasks", taskRoutes);

// Connect to MongoDB before accepting requests.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully.");

    app.listen(PORT, () => {
      console.log(`Backend running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
