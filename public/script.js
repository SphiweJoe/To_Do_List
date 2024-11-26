// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
  
    // Fetch tasks from the server
    async function getTasks() {
      const response = await fetch('/api/tasks');
      const tasks = await response.json();
      taskList.innerHTML = '';
      tasks.forEach(task => {
        renderTask(task);
      });
    }
  
    // Create a new task
    taskForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: taskText }),
        });
        const newTask = await response.json();
        renderTask(newTask);
        taskInput.value = '';
      }
    });
  
    // Render a task on the page
    function renderTask(task) {
      const li = document.createElement('li');
      li.setAttribute('data-id', task.id);
      if (task.completed) li.classList.add('completed');
  
      const span = document.createElement('span');
      span.textContent = task.text;
      li.appendChild(span);
  
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => editTask(task.id));
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', () => deleteTask(task.id));
  
      const completeBtn = document.createElement('button');
      completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
      completeBtn.addEventListener('click', () => completeTask(task.id, task.completed));
  
      li.appendChild(editBtn);
      li.appendChild(deleteBtn);
      li.appendChild(completeBtn);
      taskList.appendChild(li);
    }
  
    // Edit a task
    async function editTask(taskId) {
      const taskText = prompt('Edit your task:');
      if (taskText) {
        const response = await fetch(`/api/tasks/${taskId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: taskText }),
        });
        const updatedTask = await response.json();
        const taskItem = document.querySelector(`[data-id='${taskId}']`);
        taskItem.querySelector('span').textContent = updatedTask.text;
      }
    }
  
    // Delete a task
    async function deleteTask(taskId) {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      const taskItem = document.querySelector(`[data-id='${taskId}']`);
      taskItem.remove();
    }
  
    // Mark task as complete
    async function completeTask(taskId, completed) {
      const response = await fetch(`/api/tasks/${taskId}/complete`, {
        method: 'PUT',
      });
      const updatedTask = await response.json();
      const taskItem = document.querySelector(`[data-id='${taskId}']`);
      taskItem.classList.toggle('completed', updatedTask.completed);
      taskItem.querySelector('button').textContent = updatedTask.completed ? 'Undo' : 'Complete';
    }
  
    // Load tasks on page load
    getTasks();
  });
  