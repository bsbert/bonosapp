// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAOFIm-Ba3rBmEQVASwTBGNmwCu1SRnhgk",
    authDomain: "bonosapp-86a1c.firebaseapp.com",
    projectId: "bonosapp-86a1c",
    storageBucket: "bonosapp-86a1c.firebasestorage.app",
    messagingSenderId: "26936508307",
    appId: "1:26936508307:web:560d44bb0fda7c91cbb266",
    measurementId: "G-5XJPFYLNSC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore
export { db };