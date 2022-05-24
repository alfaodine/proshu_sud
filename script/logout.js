import {
    signOut
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
import {
    auth
} from './auth.js';

const logOutBtn = document.querySelector('.log_out');
const logOutBtn2 = document.querySelector('.log_out2');
const logOutBtnMobile = document.querySelector('.log_out_mobile');
logOutBtn.addEventListener('click', userLogOut);
logOutBtn2.addEventListener('click', userLogOut); 
logOutBtnMobile.addEventListener('click', userLogOut); 


async function userLogOut() {
    try{
        await signOut(auth);
    } catch (error){
        console.log(error);
    }
    
}