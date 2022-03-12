import firebase from "firebase/app";

import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmVIr01JOgdEwXvTZ9xcqwaTK8pAcOXIM",
  authDomain: "microproyecto2-fe8ca.firebaseapp.com",
  projectId: "microproyecto2-fe8ca",
  storageBucket: "microproyecto2-fe8ca.appspot.com",
  messagingSenderId: "179783567013",
  appId: "1:179783567013:web:7fc2e34acf384be7882f4c",
  measurementId: "G-XE5ZD0JB6W"
};

const app = firebase.initializeApp(firebaseConfig);


// Database instance
export const db = app.firestore();

// Authentication instance
export const auth = app.auth();
//Proveedor de Google
export const googleProvider = new firebase.auth.GoogleAuthProvider();
//Proveedor de Email
export const emailProvider = new firebase.auth.EmailAuthProvider();