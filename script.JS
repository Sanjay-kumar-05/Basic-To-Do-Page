document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskDescription = document.getElementById('taskDescription');
    const addButton = document.getElementById('addButton');
    const pendingTasksList = document.getElementById('pendingTasks');
    const completedTasksList = document.getElementById('completedTasks');

    addButton.addEventListener('click', addTask);

    // Load tasks from local storage on page load
    loadTasks();

    function addTask() {
        const taskName = taskInput.value.trim();
        const taskDesc = taskDescription.value.trim();

        if (taskName !== '') {
            const taskItem = createTaskItem(taskName, taskDesc);
            pendingTasksList.appendChild(taskItem);
            saveTasks();
            taskInput.value = '';
            taskDescription.value = ''; // Clear the description input
        }
    }

    function createTaskItem(taskName, taskDesc) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span><strong>Task:</strong> ${taskName}</span>
            <p><strong>Description:</strong> ${taskDesc}</p>
            <button class="complete-button">Complete</button>
            <button class="delete-button">Delete</button>
        `;

        taskItem.querySelector('.complete-button').addEventListener('click', function () {
            completeTask(taskItem);
        });

        taskItem.querySelector('.delete-button').addEventListener('click', function () {
            deleteTask(taskItem);
        });

        return taskItem;
    }

    function completeTask(taskItem) {
        const completedTaskItem = taskItem.cloneNode(true);
        completedTaskItem.querySelector('.complete-button').remove();
        completedTaskItem.querySelector('.delete-button').addEventListener('click', function () {
            deleteTask(completedTaskItem);
        });
        pendingTasksList.removeChild(taskItem);
        completedTasksList.appendChild(completedTaskItem);
        saveTasks();
    }

    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasks();
    }

    function saveTasks() {
        // Save tasks to local storage
        localStorage.setItem('pendingTasks', pendingTasksList.innerHTML);
        localStorage.setItem('completedTasks', completedTasksList.innerHTML);
    }

    function loadTasks() {
        // Load tasks from local storage
        const pendingTasks = localStorage.getItem('pendingTasks');
        const completedTasks = localStorage.getItem('completedTasks');

        if (pendingTasks) {
            pendingTasksList.innerHTML = pendingTasks;
            addEventListeners(pendingTasksList);
        }

        if (completedTasks) {
            completedTasksList.innerHTML = completedTasks;
            addEventListeners(completedTasksList);
        }
    }

    function addEventListeners(taskList) {
        // Add event listeners to complete and delete buttons
        taskList.querySelectorAll('.complete-button').forEach(function (button) {
            button.addEventListener('click', function () {
                const taskItem = button.closest('li');
                completeTask(taskItem);
            });
        });

        taskList.querySelectorAll('.delete-button').forEach(function (button) {
            button.addEventListener('click', function () {
                const taskItem = button.closest('li');
                deleteTask(taskItem);
            });
        });
    }
});
