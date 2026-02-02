// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlfRmSR0tYouGJt1IqqCNVC6RPwxWtlH4",
  authDomain: "auction-65902.firebaseapp.com",
  projectId: "auction-65902",
  storageBucket: "auction-65902.firebasestorage.app",
  messagingSenderId: "301593064296",
  appId: "1:301593064296:web:086d6f580c0e80cb2ddcdd",
  measurementId: "G-GV8TQB2J92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);
