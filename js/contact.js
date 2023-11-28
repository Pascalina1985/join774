let contacts = [{
    'firstname': 'Anton',
    'lastname': 'Mayer',
    'email': 'anton@gmail.com'
},
{
    'firstname': 'Anja',
    'lastname': 'Schulz',
    'email': 'schulz@hotmail.com'
},
{
    'firstname': 'Hans',
    'lastname': 'Rüben',
    'email': 'hans@web.de'
},
{
    'firstname': 'Frederiko',
    'lastname': 'Roberto',
    'email': 'hans@web.de'
}
];

let letters = [];

async function initContacts() {
    fillLetter();
    
    loadLetters();
    renderContacts();
}

function renderContacts() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstLetterName = contact.firstname.charAt(0);
        let firstLetterLastName = contact.lastname.charAt(0);
        document.getElementById(firstLetterLastName).innerHTML += showAvailableContactsHTML(contact, firstLetterLastName, firstLetterName, i);
    }
}

function showAvailableContactsHTML(contact, firstLetterLastName, firstLetterName, i) {
    return `<div onclick="showContact(${i})" class="contact-data">
                <div class="contact-logo">${firstLetterName}${firstLetterLastName}</div>
                    <div class="personal-contact-information">
                <div class="personal-name">${contact.firstname} ${contact.lastname}</div>
                <div class="personal-email">${contact.email}</div>
            </div>
            </div>`;
}
//Filtert die Einzelnen Buchstaben raus
function fillLetter() {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['lastname'];
        let letter = name.charAt(0);
        if (!letters.includes(letter)) {
            letters.push(letter);
        }
    }
}
//setzt das Grundgerüst der Kontakte
function loadLetters() {
    let container = document.getElementById('contact-list');
    for (let i = 0; i < letters.length; i++) {
        const element = letters[i];
        container.innerHTML += letterHTML(element);
    };
}

function letterHTML(letter) {
    return `
    <div class="letter-container">
    <p class="letter">${letter}</p>
    </div>
    <div class="contact-line"></div>
    <div id='${letter}'>
    </div>
    </div>
    `;
}

function showContact(i) {

}