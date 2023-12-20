
function loginForm() {
    login();
}


function login() {
    let inputMail = users.find(m => m.email === email.value);
    let inputPassword = users.find(p => p.password === password.value);
    let userName = getName(email.value, password.value);
    let mailText = document.getElementById('wrong-mail');
    let passwordText = document.getElementById('wrong-password');

    if (!email.validity.valid || !password.validity.valid) {
        return;
    }

    if (!inputMail) {
        email.classList.add('wrong-border');
        mailText.classList.remove('hide');
        mailText.classList.add('wrong-text');
    } else {
        email.classList.remove('wrong-border');
        mailText.classList.remove('wrong-text');
        mailText.classList.add('hide');
    }

    if (!inputPassword) {
        password.classList.add('wrong-border');
        passwordText.classList.remove('hide');
        passwordText.classList.add('wrong-text');
    } else {
        password.classList.remove('wrong-border');
        passwordText.classList.remove('wrong-text');
        passwordText.classList.add('hide');
    }

    if (inputMail && inputPassword) {
        setCookie('username', userName, 30);
        window.location.href = 'summary.html';
    }
}

function getName(email, password) {
    let foundUser = users.find(user => user.email === email && user.password === password);
    if (foundUser) {
        return foundUser.newUser; // Gibt den Namen des gefundenen Benutzers zurück
    } else {
        return null; // Oder eine andere Kennzeichnung für keinen gefundenen Benutzer
    }
}

function showPassword() {
    let img = document.getElementById('lock');
    img.src = './img/log-in/visibility_off.png';
}


function resetPasswordVisibility() {
    let img = document.getElementById('lock');
    let passwordInput = document.getElementById('password');

    if (passwordInput.value === '') {
        img.src = './img/log-in/lock.png';
    }
}


function togglePasswordVisibility() {
    let img = document.getElementById('lock');
    let passwordInput = document.getElementById('password');

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        img.src = './img/log-in/visibility.png';
    } else {
        passwordInput.type = 'password';
        img.src = './img/log-in/visibility_off.png';
    }
}


function guestLogIn() {
    window.location.href = 'summary.html';
}