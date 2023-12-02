let prios = [];

async function addTask() {
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let subtask = document.getElementById('subtask').value;


    tasks.push({ title: title, description: description, contact: getContact(), prio: getPrio(), date: date, category: category, subtask: subtask });
    await setItem('task', JSON.stringify(tasks));
    console.log(tasks);
}


function getPrio(p) {
    prios.push(p);

    for (let i = 0; i < prios.length; i++) {
        const prio = prios[i];
        return prio;
    }
}

function getContact() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        return contact;
    }
}