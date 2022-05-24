import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import {
    auth,
} from './auth.js';


const signInForm = document.querySelector('.form');
const errorLog = document.querySelector('.error-log');
let modal = document.getElementById("myModal");

const signIn = async (e) => {
    e.preventDefault();

    const email = signInForm['signUpEmail'].value;
    const password = signInForm['signUpPassword'].value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // window.location.reload();
        monitorAuthState();

    } catch (error) {
        showLoginError(error);
    }
}

signInForm.addEventListener('submit', signIn);

function showLoginError(error) {
    console.log(error);
    if (error.code == 'auth/wrong-password') {
        errorLog.innerText = 'Неправильный пароль. Попробуйте еще раз.';
        errorLog.classList.add('error-log-show');
        setTimeout(() => {
            errorLog.classList.remove('error-log-show')
        }, 5000)

    }
    if (error.code == 'auth/user-not-found') {
        errorLog.innerText = 'Неправильный email. Попробуйте еще раз.';
        errorLog.classList.add('error-log-show');
        setTimeout(() => {
            errorLog.classList.remove('error-log-show')
        }, 5000)

    }
}


const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user){
            modal.style.display = "none";
        }
    })
}