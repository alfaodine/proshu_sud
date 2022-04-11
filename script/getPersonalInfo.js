import {
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

let emailField = document.querySelector('#personal_email');
let nameField = document.querySelector('#personal_name');
let passwordField = document.querySelector('#personal_password');
let docBlock = document.querySelector('.personal__docs');
const regexp = /\/o\/(.+)\?alt=/



const userEmail = async () => {
        await onAuthStateChanged(auth, async (user) => {
        if (user){
            getPersonalInfo(auth.currentUser.email);
        }
    })
}

userEmail();


async function getPersonalInfo(email) {
    const myCollection = await getDocs(collection(db, "Users"));
    myCollection.forEach((doc) => {
        let docData = doc.data();
        if(email === docData.email){
            nameField.value = `${docData.name} ${docData.middleName} ${docData.lastName} `;
            emailField.value = docData.email;
            passwordField.value = docData.password;
            if(docData.url){
                docData.url.forEach((url) => {
                    let nameFromURL = regexp.exec(url);
                        nameFromURL = decodeURI(nameFromURL[1]);
                    let docName = nameFromURL || `documentName_${Date.now()}`;
                        
                    let docHTML = `<div class="doc" style="cursor: pointer;" onclick="window.location='${url}';">
                                    <img src="./img/doc.svg" alt="doc img">
                                    <p class="text">${docName}</p>
                                    </div>`
                    docBlock.innerHTML += docHTML;
                })
            }else{
                let docHTML = `<p class="text">У вас пока нет готовых документов</p>`;
                docBlock.innerHTML += docHTML;
            }
        }
      });
}



