const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const placeholder = document.getElementById("empty-state");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// Load tasks from localStorage
function loadTasks() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (tasks.length === 0) {
        placeholder.style.display = "flex";
    } else {
        placeholder.style.display = "none";
    }

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

// Handle form submit
const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask();
};

// Add task
const handleAddTask = () => {

    const taskText = taskInput.value.trim();

    if (taskText === "") return;

    createTaskElement(taskText);

    saveTask(taskText);

    taskInput.value = "";
};

// Create task UI
const createTaskElement = (taskText, isCompleted = false) => {

    placeholder.style.display = "none";

    const li = document.createElement("li");
    li.classList.add("task-item");

    // Task Text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;

    if (isCompleted) {
        taskSpan.style.textDecoration = "line-through";
    }

    // Complete Button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Done";
    completeBtn.classList.add("complete-btn");

    completeBtn.addEventListener("click", () => {

        taskSpan.classList.toggle("completed");

        updateTaskStatus(taskText);
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {

        li.remove();

        deleteTask(taskText);

        checkEmptyState();
    });

    // Append Elements
    li.appendChild(taskSpan);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
};

// Save task to localStorage
const saveTask = (taskText) => {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Delete task
const deleteTask = (taskText) => {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.filter(task => task.text !== taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Update completed status
const updateTaskStatus = (taskText) => {

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks = tasks.map(task => {

        if (task.text === taskText) {
            task.completed = !task.completed;
        }

        return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Show empty state
const checkEmptyState = () => {

    if (taskList.children.length === 0) {
        placeholder.style.display = "flex";
    }
};
