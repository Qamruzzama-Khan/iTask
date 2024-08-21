// Get references to HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Function to load tasks from local storage and display them
function loadTasks() {
    // Retrieve tasks from local storage or initialize to an empty array if none exist
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // Iterate over each task object and create a task element for it
    tasks.forEach(task => {
        const taskElement = createTaskElement(task.text, task.completed);
        taskList.appendChild(taskElement); // Add the task element to the list
    });
}

// Function to save the current list of tasks to local storage
function saveTasks() {
    // Create an array to store the tasks data
    const tasks = [];
    // Loop through each list item (task) in the task list
    taskList.querySelectorAll('li').forEach(li => {
        // Extract task text and completion status
        const text = li.querySelector('span').textContent;
        const completed = li.querySelector('input').checked;
        // Push the task data into the tasks array
        tasks.push({ text, completed });
    });
    // Save the tasks array to local storage as a JSON string
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to create a new task element
function createTaskElement(taskText, completed = false) {
    // Create the main list item element
    const li = document.createElement('li');

    // Create and configure the span element to display the task text
    const span = document.createElement('span');
    span.textContent = taskText;

    // Apply strikethrough style if the task is marked as completed
    if (completed) {
        span.style.textDecoration = 'line-through';
    }

    // Create and configure the checkbox input for marking the task as complete
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    // Add an event listener to handle changes in the checkbox state
    checkbox.addEventListener('click', () => {
        // Update text decoration based on checkbox state
        if (checkbox.checked) {
            span.style.textDecoration = 'line-through';
        } else {
            span.style.textDecoration = '';
        }
        // Save the updated tasks list to local storage
        saveTasks();
    });

    // Create and configure the Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    // Add an event listener to handle editing a task
    editBtn.addEventListener('click', () => {
        // Populate the input field with the current task text
        taskInput.value = span.textContent;
        // Remove the task from the list
        taskList.removeChild(li);
        // No need to save tasks here; it will be saved when a new task is added
    });

    // Create and configure the Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    // Add an event listener to handle task deletion
    deleteBtn.addEventListener('click', () => {
        // Remove the task from the list
        taskList.removeChild(li);
        // Save the updated tasks list to local storage
        saveTasks();
    });

    // Append the checkbox, text span, edit button, and delete button to the list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    // Return the fully constructed task element
    return li;
}

// Add a new task when the Add button is clicked
addTaskButton.addEventListener('click', () => {
    // Get the trimmed value of the input field
    const taskText = taskInput.value.trim();
    // Only add the task if the input field is not empty
    if (taskText) {
        // Create a new task element and add it to the task list
        const taskElement = createTaskElement(taskText);
        taskList.appendChild(taskElement);
        // Clear the input field
        taskInput.value = '';
        // Save the updated tasks list to local storage
        saveTasks();
    }
});

// Load existing tasks from local storage when the page loads
loadTasks();
