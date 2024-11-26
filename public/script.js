// Select elements
const addTaskBtn = document.getElementById('addTaskBtn');
const newTaskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');

// Add task function
addTaskBtn.addEventListener('click', function() {
  const taskText = newTaskInput.value.trim();
  if (taskText) {
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('deleteBtn');
    deleteBtn.addEventListener('click', function() {
      taskItem.remove();
    });

    // Toggle task completion
    taskItem.addEventListener('click', function() {
      taskItem.classList.toggle('completed');
    });

    taskItem.appendChild(deleteBtn);
    taskList.appendChild(taskItem);
    
    // Clear input field
    newTaskInput.value = '';
  }
});
