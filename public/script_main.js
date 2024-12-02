// Function to add a task
function addTask() {
    const taskText = document.getElementById('taskInput').value.trim();
    const taskCategory = document.getElementById('taskCategory').value;
    const completionDate = document.getElementById('completionDate').value;

    if (!taskText || !taskCategory || !completionDate) {
        alert("Please fill in all fields before adding the task.");
        return;
    }

    if (taskCategory.length > 40) {
        alert("Task category must be less than 40 characters.");
        return;
    }

    const newTask = {
        text: taskText,
        category: taskCategory,
        date: completionDate,
        completed: false
    };

    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.innerHTML = `
        <span class="task-text">${newTask.text}</span>
        <span class="task-category">
            <span class="task-category-icons ${newTask.category.toLowerCase()}"></span>
            ${newTask.category}
        </span>
        <span class="task-date">${newTask.date}</span>
        <div class="task-actions">
            <button class="task-completed" onclick="toggleTask(this)">Task Completed</button>
            <button class="task-edit" onclick="editTask(this)">Edit Task</button>
            <button class="task-delete" onclick="deleteTask(this)">Delete Task</button>
        </div>
    `;
    taskList.appendChild(li);

    // Clear inputs
    document.getElementById('taskInput').value = '';
    document.getElementById('taskCategory').value = '';
    document.getElementById('completionDate').value = '';
}

// Function to toggle task completion
function toggleTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('.task-text').innerText;
    const completed = li.classList.contains('complete');

    // Toggle completion status
    li.classList.toggle('complete', !completed);
}

// Function to edit a task
function editTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('.task-text').innerText;
    const taskCategory = li.querySelector('.task-category').innerText.trim();
    const taskDate = li.querySelector('.task-date').innerText;

    // Populate the input fields with existing values
    document.getElementById('taskInput').value = taskText;
    document.getElementById('taskCategory').value = taskCategory;
    document.getElementById('completionDate').value = taskDate;

    // Remove the task from the list (so user can add the edited task)
    li.remove();

    // Focus on the input field for a better user experience
    document.getElementById('taskInput').focus();
}

// Function to delete a task
function deleteTask(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}

// Set min date for the calendar input (Today's date or future dates only)
function setMinDateForCalendar() {
    const dateInput = document.getElementById('completionDate');
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    dateInput.setAttribute('min', today);
}

// Call the function to set the min date on page load
setMinDateForCalendar();
