async function renderTasks() {
    const taskStatistics = await getTasksData();

    document.getElementById('tasksInBoard').innerHTML = renderTasksHTML(taskStatistics.tasksInBoard);
    document.getElementById('tasksUrgent').innerHTML = renderUrgentTasksHTML();
    document.getElementById('urgentDeadline').innerHTML = renderUrgentDate();
    document.getElementById('loggedUserGreetings').innerHTML = renderLoggedUserGreetings(taskStatistics.storedName, taskStatistics.isGuest);
    document.getElementById('tasksToDo').innerHTML = renderTasksToDo(taskStatistics.tasksToDo);
    document.getElementById('tasksDone').innerHTML = renderTasksDone(taskStatistics.tasksDone);
    document.getElementById('tasksInProgress').innerHTML = renderTasksInProgress(taskStatistics.tasksinProgress);
    document.getElementById('tasksAwaitingFeedback').innerHTML = renderTasksAwaitingFeedback(taskStatistics.tasksAwaitFeedback);
}

async function getTasksData() {
    await loadTask();
    let tasksInBoard = tasks.length;
    let tasksToDo = ToDo.length;
    let tasksDone = done.length;
    let tasksinProgress = inProgress.length;
    let tasksAwaitFeedback = awaitFeedback.length;
    let storedName = getCookie('username');
    let isGuest = getCookie('guest');

    return {
        tasksInBoard,
        tasksToDo,
        tasksDone,
        tasksinProgress,
        tasksAwaitFeedback,
        storedName,
        isGuest
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

function renderLoggedUserGreetings(storedName, isGuest) {
    if (storedName) {
        return `${storedName}!`;
    } else if (isGuest === 'true') {
        return `Hallo Gast!`;
    }
}


function openBoard() {
    window.location.href = 'board.html';
}