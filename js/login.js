function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email === email.value && u.password === password.value);
  
    if (!user) {
      email.classList.add('wrong');
      password.classList.add('wrong');
    } else {
      window.location.href = 'summary.html';
    }
    email.innerHTML = '';
    password.innerHTML = '';
  }

function guestLogIn() {
    window.location.href = 'summary.html'
}