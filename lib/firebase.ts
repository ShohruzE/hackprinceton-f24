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

const errorMessages: { [key: string]: string} = {
	'auth/invalid-email': 'Invalid email address.',
	'auth/invalid-credential': 'Incorrect password.',
	'auth/user-disabled': 'This account has been disabled.',
	'auth/user-not-found': 'No user found with this email.',
	'auth/wrong-password': 'Incorrect password.',
	'auth/email-already-in-use': 'This email is already in use.',
	'auth/weak-password': 'Please choose a stronger password.',
	'auth/operation-not-allowed': 'This operation is not allowed. Please contact support.',
	'auth/requires-recent-login': 'Please log in again to continue.',
	'auth/invalid-action-code': 'The action code is invalid or has expired.',
	'auth/too-many-requests': 'Too many attempts. Please try again later.',
	'auth/network-request-failed': 'Network error. Please check your internet connection and try again.',
	'auth/invalid-verification-code': 'Invalid verification code. Please try again.',
	'auth/invalid-verification-id': 'Invalid verification ID. Please try again.',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, errorMessages }
