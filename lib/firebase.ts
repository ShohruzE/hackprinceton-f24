// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "hackprinceton-b8d6a.firebaseapp.com",
  projectId: "hackprinceton-b8d6a",
  storageBucket: "hackprinceton-b8d6a.firebasestorage.app",
  messagingSenderId: "730617766042",
  appId: "1:730617766042:web:c9f5e4aae07c7491bbff23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
