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
    let scale = windowWidth / 1460;
    // Skalierung auf zwei Dezimalstellen runden
    scale = Math.round(scale * 100) / 100;
    // Transformations-String erstellen
    let transformString = 'scale(' + scale + ')';
    //sobald die höhe der Sidebar erreicht ist wird es nicht weiter Skalliert
    if (sidebarHeigth * scale < windowHeigth) {
        // Transformations-String auf das gewünschte Element anwenden (z.B., das Body-Element)
        document.body.style.transform = transformString;
    }

}
window.onresize = function () {
    skalierungAnpassen();
};
window.onload = function () {
    skalierungAnpassen();
};