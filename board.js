let ToDo = [];
let inProgress = [];
let awaitFeedback = [];
let done = [];


function openAddTask() {
    let addTask = document.getElementById('openAddTask')

    addTask.style.visibility = 'visible';
}

function closeAddTask(){
    let addTask = document.getElementById('openAddTask')

    addTask.style.visibility = 'hidden';
}


function addTaskToArrays(status, task) {
    if (status === "ToDo") {
        ToDo.push(task);
    } else if (status === "inProgress") {
        inProgress.push(task);
    } else if (status === "awaitFeedback") {
        awaitFeedback.push(task);
    } else if (status === "done") {
        done.push(task);
    }
}

