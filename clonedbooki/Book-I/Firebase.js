// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC1C_XWLXifEdWjxceFjGkr_kIk7rIZiAQ",
  authDomain: "book-i-a1a35.firebaseapp.com",
  databaseURL:
    "https://book-i-a1a35-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "book-i-a1a35",
  storageBucket: "book-i-a1a35.appspot.com",
  messagingSenderId: "635753821975",
  appId: "1:635753821975:web:9741b0c08280b2fadee952",
  measurementId: "G-G1SFL0N6N2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

const db = getFirestore(app);

export default db;
export { auth };
