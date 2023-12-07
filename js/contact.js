let contacts = [];
let editContactValue;
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

function resetAddContact(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
}

function renderContacts() {
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstLetterName = contact.name.charAt(0);
        let lastName = contact.name.split(' ')[1];
        let firstLetterLastName = lastName.charAt(0);
        document.getElementById(firstLetterName).innerHTML += showAvailableContactsHTML(contact, firstLetterName, firstLetterLastName, i);
    }
}

function showAvailableContactsHTML(contact, firstLetterName, firstLetterLastName, i) {
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
    letters = [];
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
    let name = contacts[i].name;
    let nachName = name.split(' ')[1];
    let firstLetterLastName = nachName.charAt(0);
    let email = contacts[i].email;
    let phone = contacts[i].phone;
    document.getElementById('showedContact').innerHTML = ``;
    document.getElementById('showedContact').innerHTML = showContactHTML(name, email, phone, i, firstLetterLastName);
    if (window.innerWidth <= 700) {showContactMobile();}
}

function showContactMobile(){
    document.getElementById('contact-list').classList.add('displayNoneMobile');
    document.getElementById('addContactBTN').classList.add('displayNoneMobile');
    document.getElementById('showedContact').classList.remove('displayNoneMobile');
    document.getElementById('headline-contacts-container').classList.remove('displayNoneMobile');
    document.getElementById('menuContactBTN').classList.remove('displayNone');
    document.getElementById('arrowLeft').classList.remove('displayNone');
}

function hideContactMobile(){
    document.getElementById('contact-list').classList.remove('displayNoneMobile');
    document.getElementById('addContactBTN').classList.remove('displayNoneMobile');
    document.getElementById('showedContact').classList.add('displayNoneMobile');
    document.getElementById('headline-contacts-container').classList.add('displayNoneMobile');
    document.getElementById('menuContactBTN').classList.add('displayNone');
    document.getElementById('arrowLeft').classList.add('displayNone');
}

function showContactHTML(name, email, phone, i, firstLetterLastName) {
    return `
    <div class="user-name-initials">
        <div class="user-initials"><span>${name.charAt(0)}${firstLetterLastName}</span></div>
        <div class="user-name-information">
            <h3>${name}</h3>
            <div class="edit-delete">
                <div onclick='openEditContact(${i})' class="edit-delete-data1"><img src="./img/contacts/edit.png"><span>Edit</span></div>
                <div onclick='deleteContact(${i})' class="edit-delete-data2"><img src="./img/contacts/delete.png"><span>Delete</span></div>
            </div>
        </div>
    </div>
    <span class="contact-information-headline">Contact Information</span>
    <div class="email-phone-information">
        <span class="email-span">Email</span>
        <span class="email-span-2">${email}</span>
        <span class="email-span">Phone</span>
        <span class="phone-span">${phone}</span>
    </div>
    `;
}

async function deleteContact(i) {
    contacts.splice(i, 1);
    await setItem('contact2', JSON.stringify(contacts));
    document.getElementById('showedContact').innerHTML = ``;
    initContacts();
}

function openEditContact(i) {
    showAddContact('editContact');
    loadEditContact(i);
    editContactValue = i;
}

function loadEditContact(i) {
    let name = contacts[i].name;
    let email = contacts[i].email;
    let phone = contacts[i].phone;
    let nameInput = document.getElementById('nameEdit');
    let emailInput = document.getElementById('emailEdit');
    let phoneInput = document.getElementById('phoneEdit');
    nameInput.value = name;
    emailInput.value = email;
    phoneInput.value = phone;
}

async function editContact() {
    let nameInput = document.getElementById('nameEdit');
    let emailInput = document.getElementById('emailEdit');
    let phoneInput = document.getElementById('phoneEdit');
    contacts[editContactValue] = ({ name: nameInput.value, email: emailInput.value, phone: phoneInput.value });
    await setItem('contact2', JSON.stringify(contacts));
    closeAddContact('editContact');
    initContacts();
}