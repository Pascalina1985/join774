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


function register() {
  checkPasswords();
}


function checkPasswords() {
  let newUser = document.getElementById('newUser');
  let email = document.getElementById('email');
  let password = document.getElementById('password');
  let confirmPassword = document.getElementById('password2');
  let warningText = document.getElementById('warning');

  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add('wrong-border');
    warningText.classList.remove('hiden');
    warningText.classList.add('wrong-text');
    return;
  } else {
    confirmPassword.classList.remove('wrong-border');
    warningText.classList.remove('wrong-text');
    warningText.classList.add('hiden');
    pushNewUser(newUser, email, password);
    resetForm(newUser,email,password,confirmPassword);
    startAnimation();
  }
}


async function pushNewUser(newUser, email, password) {
  users.push({ newUser: newUser.value, email: email.value, password: password.value, });
  await setItem('users', JSON.stringify(users));
}


function resetForm(newUser, email, password, confirmPassword) {
  newUser.value = '';
  email.value = '';
  password.value = '';
  confirmPassword.value = '';
}


function startAnimation() {
  let animation = document.getElementById('animation');

  animation.classList.remove('hiden');
  animation.classList.add('success');
  animation.style.bottom = '50%'; // Neue Position in der Mitte der Seite
  document.body.style.backgroundColor = 'lightgray'; // Hintergrund grau einfärben

  setTimeout(() => {
    window.location.href = 'log-in.html';
  }, 1500);
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

