let prios = '';
let tasks = [];
let assignedTo = [];
let urgentPrio = [];

async function initTasks() {
    await loadTask();
}

async function loadTask() {
    try {
        tasks = JSON.parse(await getItem('task'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function addTask() {
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let subtask = document.getElementById('subtask').value;

    tasks.push({ title: title, description: description, contact: getContact(), prio: prios, date: date, category: category, subtask: subtask, urgentprio: urgentPrio });
    await setItem('task', JSON.stringify(tasks));
    console.log(tasks);
}


function getPrio(button) {
    chanceColor(button);
    prios = button;
}


function chanceColor(button) {  // change color? 
    let red = document.getElementById('urgentBtn');
    let yellow = document.getElementById('mediumBtn');
    let green = document.getElementById('lowBtn');

    if (button === red) {
        button.classList.add('red');
        yellow.classList.remove('yellow');
        green.classList.remove('green');
        urgentPrio.push('red');
    } else if (button === yellow) {
        button.classList.add('yellow');
        red.classList.remove('red');
        green.classList.remove('green');
        urgentPrio.push('yellow');
    } else if (button === green) {
        button.classList.add('green');
        red.classList.remove('red');
        yellow.classList.remove('yellow');
        urgentPrio.push('green');
    }
}


function getContact() { //liste der Kontake für assigned to als dropdown wo man mehrere kontakte anklicken kann 
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        return contact;
    }
}


function clearForm() {
    location.reload();
}