// Call the sortTasks function when the board is loaded
function loadTasks() {
    loadTask()
        .then(() => {
            sortTasks();
        })
        .catch(error => {
            console.error('Loading error:', error);
        });
}


function sortTasks() {
    ToDo = [];
    inProgress = [];
    awaitFeedback = [];
    done = [];

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

    updateTaskContainers(); // Update the UI after sorting
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

function openAddTask() {
    let addTask = document.getElementById('openAddTask')

    addTask.style.visibility = 'visible';
}

function closeAddTask(){
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


// HTML Template

function taskCardHTML(i, task) {
    return `
    <article id="card${i}" class="card">
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