// server/app.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

// Path to the tasks data file
const tasksFilePath = path.join(__dirname, "../data/tasks.json");

// Read the tasks from the tasks.json file
function getTasks() {
  if (fs.existsSync(tasksFilePath)) {
    const rawData = fs.readFileSync(tasksFilePath);
    return JSON.parse(rawData);
  }
  return [];
}

// Write tasks to tasks.json
function saveTasks(tasks) {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
}

// Get all tasks
app.get("/api/tasks", (req, res) => {
  const tasks = getTasks();
  res.json(tasks);
});

// Add a new task
app.post("/api/tasks", (req, res) => {
  const tasks = getTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text,
    completed: false,
  };
  tasks.push(newTask);
  saveTasks(tasks);
  res.json(newTask);
});

// Edit a task
app.put("/api/tasks/:id", (req, res) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    task.text = req.body.text;
    saveTasks(tasks);
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Delete a task
app.delete("/api/tasks/:id", (req, res) => {
  let tasks = getTasks();
  tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
  saveTasks(tasks);
  res.json({ message: "Task deleted" });
});

// Mark a task as complete
app.put("/api/tasks/:id/complete", (req, res) => {
  const tasks = getTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (task) {
    task.completed = true;
    saveTasks(tasks);
    res.json(task);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
