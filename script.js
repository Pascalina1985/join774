async function init() {
    await includeHTML();
    skalierungAnpassen();
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

function skalierungAnpassen() {
    // Fenstergröße abrufen
    let windowWidth = window.innerWidth;
    let windowHeigth = window.innerHeight;
    let sidebarHeigth = document.querySelector('.sidebarContainer').offsetHeight;
    // Skalierung berechnen
    let scaleX = windowWidth / 1460;
    let scaleY = windowHeigth / sidebarHeigth;
    // Skalierung auf zwei Dezimalstellen runden
    scaleX = Math.round(scaleX * 100) / 100;
    scaleY = Math.round(scaleY * 100) / 100;
    // Transformations-String erstellen
    let transformStringX = 'scale(' + scaleX + ')';
    let transformStringY = 'scale(' + scaleY + ')';
    //sobald die höhe der Sidebar erreicht ist wird es nicht weiter Skalliert
    if (sidebarHeigth * scaleX < windowHeigth) {
        // Transformations-String auf das gewünschte Element anwenden (z.B., das Body-Element)
        document.body.style.transform = transformStringX;
    }
    else{document.body.style.transform = transformStringY;}
}
window.onresize = function () {
    skalierungAnpassen();
};
window.onload = function () {
    skalierungAnpassen();
};