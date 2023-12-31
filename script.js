svgURLS = ['iconSummery', 'iconAddTask', 'iconBoard', 'iconContacts']

window.onresize = function() {
    skalierungAnpassen();
};

function openLogin() {
    window.open('log-in.html', '_self');
}

async function init(site) {
    document.body.classList.add('visible');
    isLoggedin();
    skalierungAnpassen();
    await loadUsers();
    await includeHTML();
    headerUserInitials();
    loadSVG();
    changeSidebarActive(site);
    loadScript(site);
}

function isLoggedin() {
    if (!getCookie('username')) {
        window.location.href = 'log-in.html';
    }
}

function loadScript(site) {
    if (site === 'contacts') { initContacts() }
    if (site === 'addTask') { initTasks() }
    if (site === 'summery') { initSummary() }
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
    let container = document.getElementById('container');
    let sidebarHeigth = document.querySelector('.sidebarContainer').offsetHeight;
    let scaleX = windowWidth / 1460;
    let scaleY = windowHeigth / sidebarHeigth;
    scaleX = Math.round(scaleX * 100) / 100;
    scaleY = Math.round(scaleY * 100) / 100;
    let transformStringX = 'scale(' + scaleX + ')';
    let transformStringY = 'scale(' + scaleY + ')';
    if (sidebarHeigth * scaleX < windowHeigth) { container.style.transform = transformStringX; };
    if (sidebarHeigth * scaleX > windowHeigth) { container.style.transform = transformStringY; };


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


function headerUserInitials() {
    let storedName = getCookie('username');
    let isGuest = getCookie('guest');

    if (isGuest === 'true') { //Gast-Log-In
        document.getElementById('userLoginInitials').innerHTML = `<span class="header-picture-user">G</span>`;
    } else if (storedName) {
        let firstLetterName = storedName.charAt(0);
        let lastName = storedName.split(' ')[1];
        let firstLetterLastName = lastName ? lastName.charAt(0) : '';

        if (firstLetterName || firstLetterLastName) {
            document.getElementById('userLoginInitials').innerHTML = renderUserInitials(firstLetterName, firstLetterLastName);
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

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

function openHelp() {
    window.location.href = 'help.html';
}

function deleteCookie() {
    document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

function openHeaderMenu() {
    document.getElementById('headerMenu').classList.remove('displayNone');
}

function closeHeaderMenu() {
    document.getElementById('headerMenu').classList.add('displayNone');
}