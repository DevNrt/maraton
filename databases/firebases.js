// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLMArVgfpy0tRSItBiOyHgwr6upkJmyRA",
  authDomain: "maraton-2dff6.firebaseapp.com",
  projectId: "maraton-2dff6",
  storageBucket: "maraton-2dff6.appspot.com",
  messagingSenderId: "756766091687",
  appId: "1:756766091687:web:300d635c21ebb7d139ae82",
  measurementId: "G-SWKZKCXJWR",
  
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default {app,database};