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

const signUpForm = document.querySelector('.form');
const nextBtn = document.querySelector('#nextBtn');

const regBlock = document.querySelector('.register-form');
const PersonalInfoBlock = document.querySelector('.personal-info-form');
let user = {};


const signUp = async (e) => {

user.email = signUpForm['register_email'].value;
user.password = signUpForm['register_password'].value;
user.password2 = signUpForm['register_password2'].value;
user.lastName = signUpForm['register_lastname'].value;
user.name = signUpForm['register_name'].value;
user.midName = signUpForm['register_midname'].value;
user.email = signUpForm['register_email'].value;
user.password = signUpForm['register_password'].value;

    try {
        const userCreated = await createUserWithEmailAndPassword(auth, user.email, user.password);
        if (userCreated.operationType === "signIn"){
            await addUserToDB(user);
            document.location.reload();
        }
    } catch (error) {
        console.log(error);
    }

}


// const refreshPage = async () => {
//     onAuthStateChanged(auth, user => {
//         if (user){
//             document.location.reload();
//         }
//     })
// }



async function addUserToDB(user) {
    console.log(signUpForm, signUpForm['register_lastname']);

    // const lastName = signUpForm['register_lastname'].value;
    // const name = signUpForm['register_name'].value;
    // const midName = signUpForm['register_midname'].value;
    // const email = signUpForm['register_email'].value;
    // const password = signUpForm['register_password'].value;

   const documentEmail = doc(db, `Users/${user.email}`);
   const docData = {
       name: user.name,
       middleName: user.midName,
       lastName: user.lastName,
       email: user.email,
       password: user.password
   }
   try{
    let response1 = await setDoc(documentEmail, docData);
    console.log(response1)
   } catch(error) {
    console.log(error)
   }
} 

const monitorAuthState1 = async () => {
    onAuthStateChanged(auth, user => {
        if (user){
            regBlock.remove();
            PersonalInfoBlock.style.display = 'block';
            fillUpPersonalInfo(user.email);
            nextBtn.removeEventListener('click', signUp);
        } else{
            nextBtn.removeAttribute("onclick");
            nextBtn.addEventListener('click', signUp);
            PersonalInfoBlock.remove();
        }
    })
}


async function fillUpPersonalInfo(email) {
    let emailField = document.querySelector('#personal_email');
    let nameField = document.querySelector('#personal_name');
    let midField = document.querySelector('#personal_midname');
    let lastNameField = document.querySelector('#personal_lastname');

    const myCollection = await getDocs(collection(db, "Users"));
    myCollection.forEach((doc) => {
        let docData = doc.data();
        if(email === docData.email){
            lastNameField.value = docData.lastName;
            midField.value = docData.middleName;
            nameField.value = docData.name;
            emailField.value = docData.email;
        }
      });
}

monitorAuthState1();
