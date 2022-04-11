    import {
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged
    } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
    import {
        doc,
        setDoc
    } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
    import {
        auth,
        db
    } from './auth.js';


    const signInForm = document.querySelector('.form');
    const errorLog = document.querySelector('.error-log');
  

    const monitorAuthState = async () => {
        onAuthStateChanged(auth, user => {
            if (user){
                window.location.replace('../personal.html');
            }
        })
    }

    document.addEventListener('DOMContentLoaded', monitorAuthState);



    const signIn = async (e) => {
        e.preventDefault();

        const email = signInForm['signUpEmail'].value;
        const password = signInForm['signUpPassword'].value;

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential.user);
        } catch (error) {
            showLoginError(error);
        }


    }

    signInForm.addEventListener('submit', signIn);
    signInForm.addEventListener('submit', addUserToDB);

    function showLoginError(error) {
        console.log(error);
        if (error.code == 'auth/wrong-password') {
            console.log('password is wrong');
            errorLog.innerText = 'Неправильный пароль. Попробуйте еще раз.';
            errorLog.classList.add('error-log-show');
            setTimeout(() => {
                errorLog.classList.remove('error-log-show')
            }, 3000)

        }
    }

 