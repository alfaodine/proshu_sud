        // Import the functions you need from the SDKs you need
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
        import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
        import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js';
        import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
        // TODO: Add SDKs for Firebase products that you want to use
        // https://firebase.google.com/docs/web/setup#available-libraries
      
        // Your web app's Firebase configuration
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: "AIzaSyCm5WtyZbK83dOUfst-wID9qgg1h9srGT4",
          authDomain: "proshusud.firebaseapp.com",
          projectId: "proshusud",
          storageBucket: "proshusud.appspot.com",
          messagingSenderId: "268915249466",
          appId: "1:268915249466:web:0aff73def1e1e1195d0003",
          measurementId: "G-JS0ER1FQ30"
        };
      
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);
        const db = getFirestore(app);

        // db.settings( { timestampsInSnapshots: true });


export {auth, db};