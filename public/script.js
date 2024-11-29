// Function to update date and time
function updateDateTime() {
    const datetimeElement = document.getElementById("datetime");
    const now = new Date();
    datetimeElement.innerHTML = now.toLocaleString();
}

// Call updateDateTime every second to keep it updated
setInterval(updateDateTime, 1000);

// Array to store tasks
let tasks = [];

// Set the minimum date for completion date input to today
function setMinCompletionDate() {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    document.getElementById("completionDate").setAttribute("min", today);
}

// Call this function to set the min date on page load
setMinCompletionDate();

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const taskCategory = document.getElementById("taskCategory").value;
    const completionDate = document.getElementById("completionDate").value;

    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }

    if (taskCategory === "") {
        alert("Please select a category.");
        return;
    }

    if (completionDate === "") {
        alert("Please select a completion date.");
        return;
    }

    const taskDate = new Date(completionDate);
    const today = new Date();

    // Ensure the selected date is not in the past
    if (taskDate < today) {
        alert("The completion date cannot be in the past.");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskInput,
        category: taskCategory,
        completed: false,
        completionDate: completionDate
    };

    tasks.push(newTask);
    renderTasks();
    document.getElementById("taskInput").value = ""; // Clear input field
    document.getElementById("completionDate").value = ""; // Clear completion date
}

// Function to render tasks
function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item" + (task.completed ? " complete" : "");

        taskItem.innerHTML = `
            <span class="task-category">${task.category}:</span> ${task.text}
            <span class="completion-date">Due: ${new Date(task.completionDate).toLocaleDateString()}</span>
            <div class="task-actions">
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

// Function to toggle task completion status
function toggleComplete(taskId) {
    const task = tasks.find(t => t.id === taskId);
    task.completed = !task.completed;
    renderTasks();
}

// Function to edit task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    const newText = prompt("Edit your task:", task.text);
    const newDate = prompt("Edit the completion date (YYYY-MM-DD):", task.completionDate);

    if (newText !== null && newText !== "" && newDate !== null && newDate !== "") {
        task.text = newText;
        task.completionDate = newDate;
        renderTasks();
    }
}

// Function to delete task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks();
}

// Initial render of tasks
renderTasks();
