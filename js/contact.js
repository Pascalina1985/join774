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
            <div class="edit-delete displayNoneMobile">
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
    <div class="displayNoneMobile" id="contactOptions">
        <button onclick="openEditContact(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <mask id="mask0_114694_1220" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                    height="24">
                    <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_114694_1220)">
                    <path
                        d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                        fill="#2A3647" />
                </g>
            </svg>
            <p>Edit</p>
        </button>
        <button onclick="deleteContact(${i})">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                <mask id="mask0_114694_1225" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25"
                    height="24">
                    <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_114694_1225)">
                    <path
                        d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z"
                        fill="#2A3647" />
                </g>
            </svg>
            <p>Delete</p>
        </button>
    </div>
    `;
}

async function deleteContact(i) {
    document.getElementById('contactOptions').classList.add('displayNoneMobile');
    contacts.splice(i, 1);
    await setItem('contact2', JSON.stringify(contacts));
    document.getElementById('showedContact').innerHTML = ``;
    initContacts();
    hideContactMobile();
}

function openEditContact(i) {    
    document.getElementById('contactOptions').classList.add('displayNoneMobile');
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

function openContactOptions(){
    document.getElementById('contactOptions').classList.remove('displayNoneMobile');
}