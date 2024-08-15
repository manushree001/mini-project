document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    // Load tasks from localStorage
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        renderTasks();
    }

    // Add a new task
    addTaskBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push(taskText);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

       // Render tasks to the DOM
       function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task}</span>
                <div class="task-actions">
                    <button class="edit-btn" onclick="editTask(${index})">Edit</button>
                    <button onclick="deleteTask(${index})">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }

    // Edit a task
    window.editTask = function (index) {
        const newTask = prompt('Edit Task:', tasks[index]);
        if (newTask !== null && newTask.trim() !== '') {
            tasks[index] = newTask.trim();
            saveTasks();
            renderTasks();
        }
    }

 // Delete a task
 window.deleteTask = function (index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
});
