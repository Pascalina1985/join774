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
                console.error(`Invalid status: ${task.status}`);
                break;
        }
    });

    updateTaskContainers(); // Update the UI after sorting
}

// Call the sortTasks function when the board is loaded
function initTasks() {
    loadTask()
        .then(() => {
            sortTasks();
        })
        .catch(error => {
            console.error('Loading error:', error);
        });
}




function updateContainer(status, taskArray, containerId) {
    const container = document.getElementById(containerId);
    // container.innerHTML = ""; // Clear the container

    if (taskArray.length === 0) {
       // container.textContent = `No tasks ${status}`;
    } else {
        taskArray.forEach(task => {
            // Create HTML elements for each task and append them to the container
            const taskElement = document.createElement('div');
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