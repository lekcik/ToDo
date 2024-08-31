function idGenerator() {
    let id = '';

    for (let i = 0; i < 10; i++) {
        let n = Math.floor(Math.random() * 10);
        id += n;
    }

    if (tasks.some(task => task.id === id)) {
        return idGenerator();
    } else {
        return id;
    }
}

function refreshList() {
    let tasksList = document.querySelector('.jsTasksList');
    let HTML = '';

    for (let i = 0; i < tasks.length; i++) {
        HTML += `
        <section class="taskContainer jsId-${tasks[i].id}">
            <h3>${tasks[i].name}</h3>
            <p>Until: ${tasks[i].date}</p>
            <p class="${tasks[i].importance}">${tasks[i].importance} importance</p>
            <button onclick="removeTask(${tasks[i].id})">Delete</button>
        </section>
        `
    }

    tasksList.innerHTML = HTML;
}

function saveToStorage(obj) {
    let obj_serialized = JSON.stringify(obj);
    localStorage.setItem('tasksArray', obj_serialized);
}

function loadFromStorage() {
    let obj_deserialized = JSON.parse(localStorage.getItem('tasksArray'));

    if (!obj_deserialized || obj_deserialized.length === 0) {
        obj_deserialized = [];
        let task = new Task('1', 'Create first task', 'No due date', 'Extreme');
        obj_deserialized.push(task);
    }

    return obj_deserialized;
}


function addTask() {
    let textInput = document.querySelector('.jsTextInput');
    let dateInput = document.querySelector('.jsDateInput');
    let importanceInput = document.querySelector('.jsImportanceInput');
    
    if (!textInput.value || !dateInput.value || !importanceInput.value) {
        alert('Fill all fields!');
    }
    else {
        let task = new Task(idGenerator(), textInput.value, dateInput.value, importanceInput.value);
        tasks.push(task);

        saveToStorage(tasks);

        refreshList();

        textInput.value = '';
        dateInput.value = '';
        importanceInput.value = 'Normal';
    }
}

function removeTask(id) {
    id = String(id);
    let taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        saveToStorage(tasks);
        refreshList();
    }
}

class Task {
    constructor(id, name, date, importance) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.importance = importance;
    }
}

let tasks = loadFromStorage();

refreshList();