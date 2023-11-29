async function initRegister() {
    loadUsers();
    login();
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}


async function register() {
    let newUser = document.getElementById('newUser');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ newUser: newUser.value, email: email.value, password: password.value, });
    await setItem('users', JSON.stringify(users));
    resetForm();
}


function moveToLogin() {
    window.location.href = 'log-in.html?msg=Hat alles geklappt';
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    if (msg) {
        msgBox.innerHTML = msg;
    }
}

function resetForm() {
    newUser.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
}

function toSignUp() {
    window.location.href = 'sign-up.html'
}