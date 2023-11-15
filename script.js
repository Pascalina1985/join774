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
    let minWidth = 1440;
    // Fenstergröße abrufen
    let windowWidth = window.innerWidth;
    if (windowWidth < minWidth) {
        // Skalierung berechnen
        let scale = windowWidth / 1460;
        // Skalierung auf zwei Dezimalstellen runden
        scale = Math.round(scale * 100) / 100;
        // Transformations-String erstellen
        let transformString = 'scale(' + scale + ')';

        // Transformations-String auf das gewünschte Element anwenden (z.B., das Body-Element)
        document.body.style.transform = transformString;
    }
    else {
        document.body.style.transform = 'scale(1)';
    }

}
window.onresize = function () {
    skalierungAnpassen();
};
window.onload = function () {
    skalierungAnpassen();
};