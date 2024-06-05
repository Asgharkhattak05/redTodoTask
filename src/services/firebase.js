import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain:process.env.FIREBASE_AUTH_DOMAIN,
  projectId:process.env.FIREBASE_PROJECT_ID,
  storageBucket:process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_APP_ID,
  appId: process.env.FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
