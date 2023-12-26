let prios = '';
let status = ''; // status added 
let tasks = [];
let assignedTo = [];
let urgentPrio = [];
let contactsDisplayed = false;
let subTasks = [];


async function initTasks() {
    await loadTask();
}

async function loadTask() {
    try {
        tasks = JSON.parse(await getItem('task'));
        contacts = JSON.parse(await getItem('contact2'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function pushToTask() {
    let status = "ToDo";  // status added
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category');
    let selectedCategoryIndex = category.selectedIndex;
    let selectedCategoryName = category.options[selectedCategoryIndex].text;
    let contactDropdown = document.getElementById('assignContact');
    let selectedContactIndex = contactDropdown.selectedIndex;
    let selectedContactName = contactDropdown.options[selectedContactIndex].text;

    tasks.push({ status: "Todo", title: title, description: description, contact: selectedContactName, prio: prios, date: date, category: selectedCategoryName, subtask: subTasks, urgentprio: urgentPrio });
    
    addTaskToArrays(status, task);  // auf dem Board zu finden
    updateTaskContainers();

    await setItem('task', JSON.stringify(tasks));
    console.log(tasks);

}


function getPrio(button) {
    prioColor(button);
    prios = button;
}


function prioColor(button) {
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


function getContact() {
    if (!contactsDisplayed) {
        let dropdown = document.getElementById('assignContact');
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            let option = document.createElement("option");
            option.text = contact.name;
            dropdown.add(option);
        }
        contactsDisplayed = true;
    }
}

function addSubtask() {
    let content = document.getElementById('subtask');
    if (content.value.trim() !== '') { // Überprüfe, ob der Input-Wert nicht leer ist
      subTasks.push(content.value);
      content.value = '';
      displaySubtasks();
    }
  }

function deleteSubtask(index) {
    subTasks.splice(index, 1); // Entfernt die Subtask aus dem Array
    displaySubtasks(); // Aktualisiert die Anzeige der Subtasks
}

function editSubtask(index) {
    let listItem = document.getElementById('list').getElementsByTagName('li')[index];
    let subtaskContent = listItem.firstChild.nodeValue.trim(); // Holt den Textinhalt des li-Elements

    let inputField = document.createElement('input'); // Erstellt ein Eingabefeld
    inputField.type = 'text';
    inputField.value = subtaskContent;

    inputField.onblur = function () {
        subTasks[index] = this.value; // Aktualisiert den Wert im Array
        displaySubtasks(); // Aktualisiert die Anzeige der Subtasks
    };

    listItem.innerHTML = ''; // Leert das li-Element
    listItem.appendChild(inputField); // Fügt das Eingabefeld hinzu
}

function displaySubtasks() {
    let listContainer = document.getElementById('list');
    listContainer.innerHTML = '';

    for (let i = 0; i < subTasks.length; i++) {
        const createdSubtask = subTasks[i];
        let listItem = document.createElement('li');
        listItem.textContent = createdSubtask;
        listItem.classList.add('hidden');

        let buttonContainer = document.createElement('div'); // Erstellt ein div-Element für die Buttons

        let deleteImg = document.createElement('img');
        deleteImg.src = "./img/log-in/delete.png";
        deleteImg.className = "deleteImg";
        deleteImg.onclick = function () { deleteSubtask(i); };

        let editImg = document.createElement('img');
        editImg.src = "./img/log-in/edit.png";
        editImg.className = "editImg";
        editImg.onclick = function () { editSubtask(i); };

        buttonContainer.appendChild(deleteImg);
        buttonContainer.appendChild(editImg);
        buttonContainer.classList.add('button-position');

        listItem.appendChild(buttonContainer); // Fügt den Button-Container zum li-Element hinzu

        listContainer.appendChild(listItem);
    }
}


function clearForm() {
    document.getElementById('titleInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('date').value = '';
    let subList = document.getElementById('list');
    subList.innerHTML = '';
    let options = document.getElementsByTagName("select");
    for (let i = 0; i < options.length; i++) {
      options[i].selectedIndex = 0;
    }
    var buttons = document.getElementsByClassName("btn-select");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("red", "yellow", "green");
    }
}