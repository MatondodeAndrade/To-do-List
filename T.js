const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filters = document.querySelectorAll('.filters button');

addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskAction);
filters.forEach(btn => btn.addEventListener('click', filterTasks));

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button class="complete">✔</button>
            <button class="delete">✖</button>
        </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    saveTasks();
}

function handleTaskAction(e) {
    if (e.target.classList.contains('complete')) {
        e.target.closest('li').classList.toggle('completed');
    } else if (e.target.classList.contains('delete')) {
        e.target.closest('li').remove();
    }
    saveTasks();
}

function filterTasks(e) {
    const filter = e.target.dataset.filter;
    document.querySelectorAll('#task-list li').forEach(task => {
        const isCompleted = task.classList.contains('completed');
        if (
            filter === 'all' ||
            (filter === 'pending' && !isCompleted) ||
            (filter === 'completed' && isCompleted)
        ) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}

function saveTasks() {
    const tasks = Array.from(taskList.children).map(task => ({
        text: task.querySelector('span').textContent,
        completed: task.classList.contains('completed')
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete">✔</button>
                <button class="delete">✖</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

loadTasks();
