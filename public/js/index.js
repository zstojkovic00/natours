import { login, logout } from './login';
import '@babel/polyfill'
import {signup} from './signup';
import { updateSettings} from './updateSettings';
import {bookTour} from './stripe';


const loginForm = document.querySelector('.login-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const signupForm = document.querySelector('.form--signup');
const userForm = document.querySelector('.form-user-data')
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');


if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('password-confirm').value;
    signup(name, email, password, confirmPassword);
  });
}


if(loginForm)
  loginForm.addEventListener('submit', (e) => {
    console.log('click');
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });

if (userForm) userForm.addEventListener('submit', async e => {
  e.preventDefault();
  document.querySelector('.btn--green').textContent = 'Updating...'
  const form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('email', document.getElementById('email').value);
  form.append('photo', document.getElementById('photo').files[0]);
  await updateSettings(form, 'data');

  document.querySelector('.btn--green').textContent = 'Save settings'

  location.reload();
});





if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async e => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });





if(logOutBtn)
  logOutBtn.addEventListener('click', logout);


if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

