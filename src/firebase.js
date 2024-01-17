import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyB2F9hjNoi7esqzHtngMGYUyJhRKWCwKXc",
    authDomain: "drive-clone-803fc.firebaseapp.com",
    projectId: "drive-clone-803fc",
    storageBucket: "drive-clone-803fc.appspot.com",
    messagingSenderId: "1098009944676",
    appId: "1:1098009944676:web:9eb3a07df9d75f56503571"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const firebasestorage = getStorage(app);
const provider = new GoogleAuthProvider();



export { auth, provider, db, firebasestorage }
