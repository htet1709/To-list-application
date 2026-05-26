const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const activeList = document.getElementById('active-list');
const completedList = document.getElementById('completed-list');

// Load data from LocalStorage on startup
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

function saveAndRender() {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    render();
}

function render() {
    activeList.innerHTML = '';
    completedList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = () => toggleTask(index);

        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = task.text;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '&#128465;';
        deleteBtn.onclick = () => deleteTask(index);

        li.append(checkbox, span, deleteBtn);

        if (task.completed) {
            completedList.appendChild(li);
        } else {
            activeList.appendChild(li);
        }
    });
}

function addTask() {
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text: text, completed: false });
    input.value = '';
    saveAndRender();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keypress', (e) => { if (e.key === 'Enter') addTask(); });

// Initial render
render();
