import {
    onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';

import {
    auth
} from './auth.js';



const monitorAuthState = async () => {
    onAuthStateChanged(auth, user => {
        if (user){
            window.location.replace('../personal.html');
        }
    })
}

monitorAuthState();