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

    let option = document.querySelector('input[name="taskChoose"]:checked').value;
    let sortedTasks = sortBy(option);

    let HTML = '';

    for (let i = 0; i < sortedTasks.length; i++) {
        HTML += `
        <section class="taskContainer jsId-${sortedTasks[i].id}">
            <h3>${sortedTasks[i].name}</h3>
            <p>Until: ${sortedTasks[i].date}</p>
            <p class="${sortedTasks[i].importance}">${sortedTasks[i].importance} importance</p>
            <button onclick="removeTask('${sortedTasks[i].id}')">Delete</button>
        </section>
        `;
    }

    tasksList.innerHTML = HTML;
}

function sortBy(option) {
    let sortedArray = [...tasks];

    if (option === 'name') {
        sortedArray.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === 'date') {
        sortedArray.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option === 'importance') {
        const importanceLevels = { 'Extreme': 5, 'High': 4, 'Normal': 3, 'Slight': 2, 'Low': 1 };
        sortedArray.sort((a, b) => importanceLevels[b.importance] - importanceLevels[a.importance]);
    }

    return sortedArray;
}

function saveToStorage(obj) {
    let obj_serialized = JSON.stringify(obj);
    localStorage.setItem('tasksArray', obj_serialized);
}

function loadFromStorage() {
    let obj_deserialized = JSON.parse(localStorage.getItem('tasksArray'));

    if (!obj_deserialized || obj_deserialized.length === 0) {
        obj_deserialized = [];
        let task = new Task(idGenerator(), 'Create first task', 'No due date', 'Extreme');
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
    } else {
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
