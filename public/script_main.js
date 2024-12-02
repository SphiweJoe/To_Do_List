// Function to add a task
function addTask(event) {
    event.preventDefault();
    const taskText = document.getElementById('taskInput').value.trim();
    const taskCategory = document.getElementById('taskCategory').value;
    const completionDate = document.getElementById('completionDate').value;

    if (!taskText || !taskCategory || !completionDate) {
        alert("Please fill in all fields before adding the task.");
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
        <div class="task-category"><strong>${newTask.category}</strong></div>
        <div class="task-text">${newTask.text}</div>
        <div class="task-date">${formatDate(newTask.date)}</div>
        <div class="task-actions">
            <button class="task-completed" onclick="toggleTask(this)">Completed</button>
            <button class="task-edit" onclick="editTask(this)">Edit</button>
            <button class="task-delete" onclick="deleteTask(this)">Delete</button>
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
    const li = button.closest('li'); // More robust way to get parent <li>
    li.classList.toggle('complete');
}

// Function to edit a task
function editTask(button) {
    const li = button.closest('li'); // More robust way to get parent <li>
    const taskText = li.querySelector('.task-text').innerText;
    const taskCategory = li.querySelector('.task-category').innerText.trim();
    const taskDate = li.querySelector('.task-date').innerText;

    // Populate the input fields with existing values
    document.getElementById('taskCategory').value = taskCategory;
    document.getElementById('taskInput').value = taskText;
    document.getElementById('completionDate').value = taskDate;

    // Remove the task from the list (so user can add the edited task)
    li.remove();

    // Focus on the input field for a better user experience
    document.getElementById('taskInput').focus();
}

// Function to delete a task
function deleteTask(button) {
    const li = button.closest('li'); // More robust way to get parent <li>
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

// Display current date and time in the header
function updateDateTime() {
    const dateTime = new Date();
    const formattedDate = dateTime.toLocaleString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    document.getElementById('datetime').textContent = formattedDate;
}

// Update date and time every second
setInterval(updateDateTime, 1000);

// Function to format the date into a more user-friendly format
function formatDate(dateString) {
    const date = new Date(dateString);

    // If the date is invalid, return an empty string
    if (isNaN(date)) {
        return "Invalid date";
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}
