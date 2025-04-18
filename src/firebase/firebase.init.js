// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3gSTwMkQEY6tvw4SN8UdbVNCK61_f-1g",
  authDomain: "it-based-edu-and-profession.firebaseapp.com",
  projectId: "it-based-edu-and-profession",
  storageBucket: "it-based-edu-and-profession.firebasestorage.app",
  messagingSenderId: "378397456648",
  appId: "1:378397456648:web:7597130c04f155599bd4bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);