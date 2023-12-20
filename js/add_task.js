let prios = '';
let status = ''; // status added 
let tasks = [];
let assignedTo = [];
let urgentPrio = [];
let contactsDisplayed = false;


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


async function addTask() {
    await pushToTask();
    console.log(tasks);
}


async function pushToTask() {
    let status = "ToDo";  // status added
    let title = document.getElementById('titleInput').value;
    let description = document.getElementById('descriptionInput').value;
    let date = document.getElementById('date').value;
    let category = document.getElementById('category').value;
    let subtask = document.getElementById('subtask').value;
    let contactDropdown = document.getElementById('assignContact');
    let selectedContactIndex = contactDropdown.selectedIndex;
    let selectedContactName = contactDropdown.options[selectedContactIndex].text;

    if (title === "" || date === "" || category === "") {
        document.getElementById('titleInput').classList.add('wrong-border');
        document.getElementById('date').classList.add('wrong-border');
        document.getElementById('category').classList.add('wrong-border');
    } else {
        tasks.push({ title: title, description: description, contact: selectedContactName, prio: prios, date: date, category: category, subtask: subtask, urgentprio: urgentPrio });
        await setItem('task', JSON.stringify(tasks));
        addTaskToArrays(status, newTask);  // auf dem Board zu finden
        updateTaskContainers();   
    }
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
    var subtaskInput = document.getElementById('subtask');
    var subtaskValue = subtaskInput.value;
    if (subtaskValue) {
      var subtaskList = document.createElement('ul');
      var newSubtask = document.createElement('li');
      newSubtask.appendChild(document.createTextNode(subtaskValue));
      subtaskList.appendChild(newSubtask);
      subtaskList.classList.add('list');
      var subtaskContainer = document.getElementsByClassName('subtask')[0];
      subtaskContainer.appendChild(subtaskList);
      subtaskInput.value = '';
  
      newSubtask.addEventListener('dblclick', function () {
        var deleteIcon = document.createElement('img');
        deleteIcon.src = './img/log-in/delete.png';
        deleteIcon.onclick = function () {
          this.parentNode.remove();
        };
  
        var inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = this.firstChild.nodeValue;
  
        inputField.onblur = function () {
          newSubtask.firstChild.nodeValue = this.value;
          this.parentNode.removeChild(this);
        };
  
        this.appendChild(deleteIcon);
        this.appendChild(inputField);
        inputField.focus();
      });
    }
  }


function clearForm() {
    location.reload();
}