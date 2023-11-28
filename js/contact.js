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
    }
];

function renderContacts() {
    document.getElementById('contact-list').innerHTML = ``;
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let firstLetterName = contact.firstname.charAt(0);
        let firstLetterLastName = contact.lastname.charAt(0);
        document.getElementById('contact-list').innerHTML += showAvailableContactsHTML(contact, firstLetterLastName, firstLetterName, i);
    }
}

function showAvailableContactsHTML(contact, firstLetterLastName, firstLetterName, i) {
    return `
    <div class="letter-container">
    <p class="letter">${firstLetterLastName}</p>
    </div>
    <div class="contact-line"></div>
    <div onclick="showContact(${i})" class="contact-data">
    <div class="contact-logo">${firstLetterName}${firstLetterLastName}</div>
    <div class="personal-contact-information">
        <div class="personal-name">${contact.firstname} ${contact.lastname}</div>
        <div class="personal-email">${contact.email}</div>
    </div>
    </div>
    `;
}

function showContact(i) {

}