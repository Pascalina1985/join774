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

function updateTaskContainers() {
    updateContainer('ToDo', ToDo, 'toDoContainer');
    updateContainer('inProgress', inProgress, 'progressContainer');
    updateContainer('awaitFeedback', awaitFeedback, 'feedbackContainer');
    updateContainer('done', done, 'doneContainer');
}

function updateContainer(status, taskArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear the container

    if (taskArray.length === 0) {
        container.textContent = `No tasks ${status}`;
    } else {
        taskArray.forEach(task => {
            // Create HTML elements for each task and append them to the container
            const taskElement = document.createElement('div');
        });
    }
}