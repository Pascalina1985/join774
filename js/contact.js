let contacts = [
];

let letters = [];

async function initContacts() {
    await loadContacts();
    fillLetter();
    loadLetters();
    renderContacts();
}

async function loadContacts() {
    try {
        contacts = JSON.parse(await getItem('contact2'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function addContact() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    contacts.push({ name: name.value, email: email.value, phone: phone.value });
    await setItem('contact2', JSON.stringify(contacts));
    closeAddContact('addContact');
    resetAddContact(name, email, phone);
    initContacts();
}

function resetAddContact(name, email, phone){
    name.value = '';
    email.value = '';
    phone.value = '';
}

function renderContacts() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstLetterName = contact.name.charAt(0);
        let firstLetterLastName = contact.name.charAt(0);
        document.getElementById(firstLetterName).innerHTML += showAvailableContactsHTML(contact, firstLetterLastName, firstLetterName, i);
    }
}

function showAvailableContactsHTML(contact, firstLetterLastName, firstLetterName, i) {
    return `<div onclick="showContact(${i})" class="contact-data">
                <div class="contact-logo">${firstLetterName}${firstLetterLastName}</div>
                    <div class="personal-contact-information">
                <div class="personal-name">${contact.name}</div>
                <div class="personal-email">${contact.email}</div>
            </div>
            </div>`;
}
//Filtert die Einzelnen Buchstaben raus
function fillLetter() {
    for (let i = 0; i < contacts.length; i++) {
        let name = contacts[i]['name'];
        let letter = name.charAt(0);
        if (!letters.includes(letter)) {
            letters.push(letter);
        }
    }
}
//setzt das Grundgerüst der Kontakte
function loadLetters() {
    let container = document.getElementById('contact-list');
    container.innerHTML = '';
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