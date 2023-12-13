// Für Gesamtzahl tasks und dringliche tasks Daten aus add_task.js von tasks JSON-Objekt entnommen
async function renderTasks() {
    await loadTask()
    let tasksInBoard = tasks.length;
    document.getElementById('tasksInBoard').innerHTML = renderTasksHTML(tasksInBoard);
    document.getElementById('tasksUrgent').innerHTML = renderUrgentTasksHTML();
    document.getElementById('urgentDeadline').innerHTML = renderUrgentDate();
}

function renderTasksHTML(tasksInBoard) {
    return `${tasksInBoard}`;
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
        return `Kein rotes und dringendes Datum gefunden.`;
    }
}


//Daten aus board (todo, in progress, await feedback, done) werden noch implementiert sobald vorhanden