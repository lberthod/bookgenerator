// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyB7awPxYjT4ERyD6Xd_hPIkWxdG_mNvpGE",
    authDomain: "rxd-dapp.firebaseapp.com",
    databaseURL: "https://rxd-dapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "rxd-dapp",
    storageBucket: "rxd-dapp.appspot.com",
    messagingSenderId: "542291774314",
    appId: "1:542291774314:web:cd801c6c80b115445bf313"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, ref, set, auth, GoogleAuthProvider, signInWithPopup };