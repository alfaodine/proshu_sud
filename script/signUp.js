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

const signUpForm = document.querySelector('.form');
const errorLog = document.querySelector('.error-log');


const signUp = async (e) => {
    e.preventDefault();

    

const email = signUpForm['register_email'].value;
const password = signUpForm['register_password'].value;
const password2 = signUpForm['register_password2'].value;
 
if (password === password2) {
    try {
        const userCreated = await createUserWithEmailAndPassword(auth, email, password);
        if (userCreated.operationType === "signIn"){
            await addUserToDB();
            monitorAuthState();
        }
    } catch (error) {
        if (String(error).includes('auth/email-already-in-use')) showError('Этот email уже зарегистрирован. Попробуйте войти в аккаунт');
        if (String(error).includes('auth/internal-error')) showError('Проверьте правильность написания пароль или email адреса');
        if (String(error).includes('auth/invalid-email')) showError('Проверьте правильность написания email адреса');
        console.log(error);
    }
} else {
    showError('Пароли не совпадают. Попробуйте еще раз.')
}



}


function showError (err) {
    errorLog.innerText = err;
    errorLog.classList.add('error-log-show');
    setTimeout(() => {
        errorLog.classList.remove('error-log-show')
    }, 5000)
}

async function addUserToDB() {

    const lastName = signUpForm['register_lastname'].value;
    const name = signUpForm['register_name'].value;
    const midName = signUpForm['register_midname'].value;
    const email = signUpForm['register_email'].value;
    const password = signUpForm['register_password'].value;

   const documentEmail = doc(db, `Users/${email}`);
   const docData = {
       id: Date.now(),
       name: name,
       middleName: midName,
       lastName: lastName,
       email: email,
       password: password
   }
   try{
    let response1 = await setDoc(documentEmail, docData);
    console.log(response1)
   } catch(error) {
    console.log(error)
   }
} 

const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user){
            window.location.replace('../personal.html');
        }
    })
}


signUpForm.addEventListener('submit', signUp);