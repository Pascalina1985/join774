async function initSummary() {
    await loadTask();
    renderTasks();
}

async function renderTasks() {
    const taskStatistics = await getTasksData();

    document.getElementById('tasksInBoard').innerHTML = renderTasksHTML(taskStatistics.tasksInBoard);
    document.getElementById('tasksUrgent').innerHTML = renderUrgentTasksHTML();
    document.getElementById('urgentDeadline').innerHTML = renderUrgentDate();
    document.getElementById('loggedUserGreetings').innerHTML = renderLoggedUserGreetings(taskStatistics.storedName);
    document.getElementById('tasksToDo').innerHTML = renderTasksToDo(taskStatistics.tasksToDo);
    document.getElementById('tasksDone').innerHTML = renderTasksDone(taskStatistics.tasksDone);
    document.getElementById('tasksInProgress').innerHTML = renderTasksInProgress(taskStatistics.tasksinProgress);
    document.getElementById('tasksAwaitingFeedback').innerHTML = renderTasksAwaitingFeedback(taskStatistics.tasksAwaitFeedback);
    document.getElementById('greetingDate').innerHTML = greetingDate();
}

async function getTasksData() {
    let tasksInBoard = tasks.length;
    let storedName = getCookie('username');
    let tasksToDo = 0;
    let tasksDone = 0;
    let tasksinProgress = 0;
    let tasksAwaitFeedback = 0;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.status) {
            if (task.status.includes('toDo')) {
                tasksToDo++;
            } else if (task.status.includes('done')) {
                tasksDone++;
            } else if (task.status.includes('inProgress')) {
                tasksinProgress++;
            } else if (task.status.includes('awaitFeedback')) {
                tasksAwaitFeedback++;
            }
        }
    }

    return {
        tasksInBoard,
        storedName,
        tasksToDo,
        tasksDone,
        tasksinProgress,
        tasksAwaitFeedback
    };
}

function renderTasksHTML(tasksInBoard) {
    return `${tasksInBoard}`;
}

function renderTasksToDo(tasksToDo) {
    return `${tasksToDo}`;
}

function renderTasksDone(tasksDone) {
    return `${tasksDone}`;
}

function renderTasksInProgress(tasksinProgress) {
    return `${tasksinProgress}`;
}

function renderTasksAwaitingFeedback(tasksAwaitFeedback) {
    return `${tasksAwaitFeedback}`;
}

function renderUrgentTasksHTML() {
    let numberOfRedTasks = 0;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        if (task.urgentprio && task.urgentprio.includes('red')) {
            numberOfRedTasks++;
        }
    }
    return `${numberOfRedTasks}`;
}

function renderUrgentDate() {
    let earliestRedDate = null;

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        if (task.urgentprio && task.urgentprio.includes('red') && task.date) {
            if (!earliestRedDate || task.date < earliestRedDate) {
                earliestRedDate = task.date;
                const [year, month, day] = earliestRedDate.split('-');
                earliestRedDate = `${day}-${month}-${year}`;
            }
        }
    }

    if (earliestRedDate) {
        return `${earliestRedDate}`;
    } else {
        return `Kein dringendes Datum`;
    }
}

function renderLoggedUserGreetings(storedName) {
    if (storedName === 'Guest' || storedName === null) {
        return ``;
    } else {
        return `${storedName}!`;
    }
}


function openBoard() {
    window.location.href = 'board.html';
}

function greetingDate() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let greeting;

    if (hours < 12) {
        greeting = "Good morning";
    } else if (hours < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }

    return greeting;
}