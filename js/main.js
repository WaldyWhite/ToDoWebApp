const forma = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');


let tasks = [];
if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach((task) => renderTasks(task));
};

checkEmptyList();

// add Task
forma.addEventListener('submit', addTask);
// delete task
tasksList.addEventListener('click', deleteTask);
//mark the task completed
tasksList.addEventListener('click', doneTask);

function addTask(event) {
    //stops default behavior
    event.preventDefault();
    const taskText = taskInput.value;
    const newTask = {
        id: Date.now(), text: taskText, done: false,
    }
    tasks.push(newTask);
    addToLocalStorage();
    renderTasks(newTask)
    taskInput.value = '';
    taskInput.focus();
    checkEmptyList();
};

function deleteTask(event) {
    // проверяем что клик был по кнопке Delete
    if (event.target.dataset.action !== 'delete') return;
    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);
    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);
    addToLocalStorage();
    parentNode.remove();
    checkEmptyList();
};

function doneTask(event) {
    if (event.target.dataset.action !== 'done') return;
    const parentNode = event.target.closest('.list-group-item');
    const id = Number(parentNode.id);
    const task = tasks.find((task) => task.id === id);
    task.done = !task.done;
    console.log(task)
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
    addToLocalStorage();
};

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список дел пуст</div>
            </li>
        `;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    };

    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    };
};

function addToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
};

function renderTasks(task) {
    const cssClass = task.done ? "task-title--done" : "task-title";

    const taskHTML = `
        <li id = ${task.id} class="list-group-item d-flex justify-content-between task-item">
            <span class=${cssClass}>${task.text}</span>
            <div class="task-item__buttons">
                <button type="button" data-action="done" class="btn-action">
                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                </button>
            </div>
        </li>`;
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
};








