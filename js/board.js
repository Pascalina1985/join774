let currentDraggedElement;
let currentStatusBox;


// Call the sortTasks function when the board is loaded
function loadTasks() {
    loadTask()
        .then(() => {
            sortTasks();
        })
        .catch(error => {
            console.log('Loading error:', error);
        });
}


async function sortTasks() {
    let todo = tasks.filter(t => t['status'] == 'toDo');
    document.getElementById('toDoContainer').innerHTML = '';

<<<<<<< HEAD
    for (let index = 0; index < todo.length; index++) {
        const task = todo[index];
        document.getElementById('toDoContainer').innerHTML += taskCardHTML(index, task);
    }
=======
    tasks.forEach(task => {
        switch (task.status) {
            case "ToDo":
                ToDo.push(task);
                break;
            case "inProgress":
                inProgress.push(task);
                break;
            case "awaitFeedback":
                awaitFeedback.push(task);
                break;
            case "done":
                done.push(task);
                break;
            default:
                // console.error(`Invalid status: ${task.status}`);
                break;
        }
    });
>>>>>>> a625d75b31a132c5e76ba5a0f4c41b215615213c

    let inProgress = tasks.filter(t => t['status'] == 'inProgress');
    document.getElementById('progressContainer').innerHTML = '';

    for (let index = 0; index < inProgress.length; index++) {
        const task = inProgress[index];
        document.getElementById('progressContainer').innerHTML += taskCardHTML(index, task);
    }

    let awaitFeedback = tasks.filter(t => t['status'] == 'awaitFeedback');
    document.getElementById('feedbackContainer').innerHTML = '';

    for (let index = 0; index < awaitFeedback.length; index++) {
        const task = awaitFeedback[index];
        document.getElementById('feedbackContainer').innerHTML += taskCardHTML(index, task);
    }

    let done = tasks.filter(t => t['status'] == 'done');
    document.getElementById('doneContainer').innerHTML = '';

    for (let index = 0; index < done.length; index++) {
        const task = done[index];
        document.getElementById('doneContainer').innerHTML += taskCardHTML(index, task);
    }

    pushToBackend();
}

function startDragging(i) {
    currentDraggedElement = i;
}




function updateContainer(status, taskArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear the container

    if (taskArray.length === 0) {
        container.textContent = `No tasks ${status}`;
    } else {
        taskArray.forEach((task, index) => {
            // Create HTML elements for each task using the createTaskTemplate function
            const taskElement = document.createElement('div');
            taskElement.innerHTML = taskCardHTML(index, task);

            // Append the task HTML to the container
            container.appendChild(taskElement);
        });
    }
}

function updateTaskContainers() {
    updateContainer('ToDo', ToDo, 'toDoContainer');
    updateContainer('inProgress', inProgress, 'progressContainer');
    updateContainer('awaitFeedback', awaitFeedback, 'feedbackContainer');
    updateContainer('done', done, 'doneContainer');
}

function openAddTask(statusBox) {
    let addTask = document.getElementById('openAddTask');
    addTask.style.visibility = 'visible';

    // Update the currentStatusBox variable
    currentStatusBox = statusBox;
}

<<<<<<< HEAD


function closeAddTask(){
=======
function closeAddTask() {
>>>>>>> a625d75b31a132c5e76ba5a0f4c41b215615213c
    let addTask = document.getElementById('openAddTask')

    addTask.style.visibility = 'hidden';
}

function changeTaskStatus(tasks, i, newStatus) { // beispiel changeTaskStatus(tasks, 17, awaitFeedback)

    if (Array.isArray(tasks) && i >= 0 && i < tasks.length && newStatus) {

        tasks[i].status = newStatus;
        console.log(`Status of task at index ${i} changed to ${newStatus}:`, tasks[i]);
    } else {
        console.error("Invalid tasks array, index, or new status");
    }
}

  function moveTo(status) {
    console.log('Moving to status:', status);
    console.log('Current dragged element:', currentDraggedElement);
    tasks[currentDraggedElement]['status'] = status;
    sortTasks();
}

function allowDrop(ev) {
    ev.preventDefault();
}



// HTML Template

function taskCardHTML(i, task) {
    return `
    <article id="card${i}" class="card" draggable="true" ondragstart="startDragging(${i})">
        <div class="cardLabel" id="cardLabel${i}">${task.category}</div>
        <div class="card-header" id="cardHeader${i}">${task.title}</div>
        <div class="card-content" id="cardContent${i}">${task.description}</div>
        <div class="card-progress" id="cardProgress${i}">
            <div class="progressbar" id="progressbar${i}"></div>
            <div class="subtasks" id="subtasks${i}">${task.subtask.length}/${task.subtask.length} Subtasks</div>
        </div>
        <div class="organisation" id="organisation${i}">
            <div class="members" id="members${i}"><img src="img/header/User profile initials.png" alt="" class="profile-badge"></div>
            <div class="prority" id="priority${i}"><img src="img/add-Task/Prio alta.png" alt=""></div>
        </div>
    </article>
    `;
}



loadTasks();
