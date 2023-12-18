svgURLS = ['iconSummery', 'iconAddTask', 'iconBoard', 'iconContacts']

window.onresize = function() {
    skalierungAnpassen();
};

function openLogin() {
    window.open('log-in.html', '_self');
}

async function init(site) {
    document.body.classList.add('visible');
    skalierungAnpassen();
    await loadUsers();
    await includeHTML();
    headerUserInitials();
    loadSVG();
    changeSidebarActive(site);
    loadScript(site);
}

function loadScript(site) {
    if (site === 'contacts') { initContacts() }
    if (site === 'addTask') { initTasks() }
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        let element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        try {
            let resp = await fetch(file);
            if (resp.ok) {
                element.innerHTML = await resp.text();
            } else {
                element.innerHTML = 'Page not found';
            }
        } catch (error) {
            console.error('Error loading file:', error);
        }
    }
}

function skalierungAnpassen() {
    let windowWidth = window.innerWidth;
    let windowHeigth = window.innerHeight;
    let sidebarHeigth = document.querySelector('.sidebarContainer').offsetHeight;
    let scaleX = windowWidth / 1460;
    let scaleY = windowHeigth / sidebarHeigth;
    scaleX = Math.round(scaleX * 100) / 100;
    scaleY = Math.round(scaleY * 100) / 100;
    let transformStringX = 'scale(' + scaleX + ')';
    let transformStringY = 'scale(' + scaleY + ')';
    if (sidebarHeigth * scaleX < windowHeigth) { document.body.style.transform = transformStringX; };
    if (sidebarHeigth * scaleX > windowHeigth) { document.body.style.transform = transformStringY; };
}

function loadSVG() {
    for (let i = 0; i < svgURLS.length; i++) {
        const element = svgURLS[i];
        fetch(`img/sidebar/${element}.svg`)
            .then(response => response.text())
            .then(svgData => {
                document.getElementById(element).innerHTML = svgData;
            });
    }
}

function changeSidebarActive(site) {
    document.getElementById('summery').classList.remove('active');
    document.getElementById('addTask').classList.remove('active');
    document.getElementById('board').classList.remove('active');
    document.getElementById('contacts').classList.remove('active');
    document.getElementById('privacyPolicy').classList.remove('active');
    document.getElementById('legalNotice').classList.remove('active');
    document.getElementById(site).classList.add('active');
}


function showAddContact(element) {
    document.getElementById(element).classList.remove('displayNone');
}

function closeAddContact(element) {
    document.getElementById(element).classList.add('displayNone');
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

//Eingeloggter User im local storage gespeichert und abgerufen
function headerUserInitials() {
    let storedName = localStorage.getItem('loggedInUserName');

    if (storedName) {
        let firstLetterName = storedName.charAt(0);
        let lastName = storedName.split(' ')[1];
        let firstLetterLastName = lastName ? lastName.charAt(0) : '';

        if (firstLetterName || firstLetterLastName) {
            document.getElementById('userLoginInitials').innerHTML = renderUserInitials(firstLetterName, firstLetterLastName);
        } else {
            document.getElementById('userLoginInitials').innerHTML = `<span class="header-picture-user">G</span>`;
        }
    }
}



function renderUserInitials(firstLetterName, firstLetterLastName) {
    if (!firstLetterLastName) {
        return `
        <span class="header-picture-user">${firstLetterName}</span>
        `;
    } else {
        return `
        <span class="header-picture-user">${firstLetterName}${firstLetterLastName}</span>
        `;
    }
}