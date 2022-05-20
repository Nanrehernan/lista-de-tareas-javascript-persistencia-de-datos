// declaracion de variables
const taskContainer = document.getElementById("task-container");
const form = document.getElementById("task-form");

// Eventos
form.addEventListener("submit", setTask, false);

// Acciones
function setTask(e) {
    e.preventDefault();

    if (e.target.taskTitle.value === "" || e.target.taskText.value === "") {
        alert("Las tareas no pueden ser vacias");
        return;
    }

    const task = {
        title: e.target.taskTitle.value,
        task: e.target.taskText.value
    }

    let lista = localStorage.getItem("task");

    if (lista === null) {
        lista = [];
        lista.push(task);
        localStorage.setItem("task", JSON.stringify(lista));
    } else {
        lista = JSON.parse(lista);
        lista.push(task);
        localStorage.setItem("task", JSON.stringify(lista));
    }

    listTask();

    e.target.reset();
    e.target.taskTitle.focus();
}

function listTask() {
    let lista = localStorage.getItem("task");

    if (!(lista === null)) {
        lista = JSON.parse(lista);
        taskContainer.innerHTML = "";
        for (let task of lista) {
            let elemento = `
                <div class='task-element'>
                    <div class='element'>
                        <h3>${task.title}</h3>
                        <p>${task.task}</p>
                    </div>
                    <button task='${JSON.stringify(task)}' class='btn-delete'>x</button>
                </div>
            `;

            taskContainer.innerHTML += elemento;
        }

        const buttons = document.getElementsByClassName("btn-delete");

        for (let button of buttons) {
            button.addEventListener("click", deleteTask, false);
        }
    }
}

listTask();

function deleteTask(e) {
    const task = e.target.getAttribute("task");
    let lista = JSON.parse(localStorage.getItem("task"));
    let index = 0;
    for (let tarea of lista) {
        if (JSON.stringify(tarea) === task) {
            break;
        }
        index++;
    }
    lista.splice(index, 1);

    localStorage.setItem("task", JSON.stringify(lista));
    
    listTask();
}