import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import {
    collection,
    getDocs
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import {
    auth,
    db
} from './auth.js';
import {
    doc,
    setDoc
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';

const signUpForm = document.querySelectorAll('.form')[1];
const nextBtn = document.querySelector('#nextBtn');

const regBlock = document.querySelector('.register-form');
const PersonalInfoBlock = document.querySelector('.personal-info-form');
const errorLog = document.querySelector('.error-log');
let user = {};


const signUp = async (e) => {
user.email = signUpForm['register_email'].value;
user.password = signUpForm['register_password'].value;
user.password2 = signUpForm['register_password2'].value;
user.lastName = signUpForm['register_lastname'].value;
user.name = signUpForm['register_name'].value;
user.midName = signUpForm['register_midname'].value;
user.password = signUpForm['register_password'].value;
console.log(user);
if (user.password === user.password2) {
    try {
        const userCreated = await createUserWithEmailAndPassword(auth, user.email, user.password);
        if (userCreated.operationType === "signIn"){
            await addUserToDB(user);
            // document.location.reload();
            monitorAuthState1();
            fillUpPersonalInfo(user.email);
        }
    } catch (error) {
        if (String(error).includes('auth/email-already-in-use')) showError('Этот email уже зарегистрирован. Попробуйте войти в аккаунт');
        if (String(error).includes('auth/internal-error')) showError('Проверьте правильность написания пароль или email адреса');
        if (String(error).includes('auth/invalid-email')) showError('Проверьте правильность написания email адреса');
        console.log(error);
    }
} else {
    showError ('Пароли не совпадают. Попробуйте еще раз.');
}

}

function showError (err) {
    errorLog.innerText = err;
    errorLog.classList.add('error-log-show');
    setTimeout(() => {
        errorLog.classList.remove('error-log-show')
    }, 5000)
}




async function addUserToDB(user) {
    console.log(signUpForm, signUpForm['register_lastname']);

   const documentEmail = doc(db, `Users/${user.email}`);
   const docData = {
       name: user.name,
       middleName: user.midName,
       lastName: user.lastName,
       email: user.email,
       password: user.password,
       id: Date.now(),
   }
   console.log(docData);
   try{
    await setDoc(documentEmail, docData);
   } catch(error) {
    console.log(error)
   }
} 

const monitorAuthState1 = async () => {
    onAuthStateChanged(auth, user => {
        if (user){
            // regBlock.style.display = 'none';
            regBlock.remove();
            PersonalInfoBlock.style.display = 'block';
            fillUpPersonalInfo(user.email);
            nextBtn.removeEventListener('click', signUp);
            nextBtn.setAttribute('onclick', 'nextPrev(1)')
        } else{
            nextBtn.removeAttribute("onclick");
            nextBtn.addEventListener('click', signUp);
            // PersonalInfoBlock.remove();
        }
    })
}


async function fillUpPersonalInfo(email) {
    const myCollection = await getDocs(collection(db, "Users"));

    let emailField = document.querySelector('#personal_email');
    let nameField = document.querySelector('#personal_name');
    let midField = document.querySelector('#personal_midname');
    let lastNameField = document.querySelector('#personal_lastname');
    try{
        myCollection.forEach((doc) => {
            let docData = doc.data();
            if(email === docData.email){
                lastNameField.value = docData.lastName;
                midField.value = docData.middleName;
                nameField.value = docData.name;
                emailField.value = docData.email;
            }
          });
    } catch (error){
        console.log('errorinfn:', error)
    }

}

monitorAuthState1();
