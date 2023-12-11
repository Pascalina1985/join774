function loginForm() {
  login();
}


function login() {
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let user = users.find(u => u.email === email.value && u.password === password.value);

  email.innerHTML = '';
  password.innerHTML = '';
  if (!user) {
    email.classList.add('wrong');
    password.classList.add('wrong');
  }
  window.location.href = 'summary.html';
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
  window.location.href = 'summary.html'
}