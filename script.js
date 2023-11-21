async function init() {
    await includeHTML();
    skalierungAnpassen();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        let element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        try{
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }catch(error){
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
    if (sidebarHeigth * scaleX < windowHeigth) {document.body.style.transform = transformStringX;}
    if (window.innerWidth < 700) {document.body.style.transform = 'scale(1)'} 
    if (sidebarHeigth * scaleX > windowHeigth) {document.body.style.transform = transformStringY;}
}
window.onresize = function () {
        skalierungAnpassen();
    
};

function showAddContact(element) {
    document.getElementById(element).classList.remove('displayNone');
}

function closeAddContact(element) {
    document.getElementById(element).classList.add('displayNone');
}