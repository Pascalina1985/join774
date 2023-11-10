async function init() {
    await includeHTML();
    await includeHeaderHTML();
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

async function includeHeaderHTML() {
    const response = await fetch('./assets/templates/header.html');
    const html = await response.text();
    document.getElementById('headerContainer').innerHTML = html;
}