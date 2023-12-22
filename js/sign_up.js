async function initRegister() {
    loadUsers();
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
    let confirmPassword = document.getElementById('password2');
    users.push({ newUser: newUser.value, email: email.value, password: password.value, });
    await setItem('users', JSON.stringify(users));
    resetForm(confirmPassword);
    window.location.href = 'log-in.html'
}


function resetForm(confirmPassword) {
    newUser.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
}


function showPassword(inputId) {
    let img = document.getElementById('lock-' + inputId);
    img.src = './img/log-in/visibility_off.png';
  }
  
  function resetPasswordVisibility(inputId) {
    let img = document.getElementById('lock-' + inputId);
    let passwordInput = document.getElementById(inputId);
    if (passwordInput.value === '') {
      img.src = './img/log-in/lock.png';
    }
  }
  
  function togglePasswordVisibility(inputId) {
    let img = document.getElementById('lock-' + inputId);
    let passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      img.src = './img/log-in/visibility.png';
    } else {
      passwordInput.type = 'password';
      img.src = './img/log-in/visibility_off.png';
    }
  }
  
