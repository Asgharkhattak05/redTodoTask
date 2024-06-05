import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCBWM-aW82XmyCTNyAOHEJTbe7ihGPObwo",
  authDomain: "todos-3a07b.firebaseapp.com",
  projectId: "todos-3a07b",
  storageBucket: "todos-3a07b.appspot.com",
  messagingSenderId: "939147217201",
  appId: "1:939147217201:web:ff4c02b1f545066df90810"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
