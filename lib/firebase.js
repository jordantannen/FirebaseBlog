// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQsgjyk4MxXgD6i1uWisjAQ7jxbnB3M1g",
  authDomain: "fir-blog-5e369.firebaseapp.com",
  projectId: "fir-blog-5e369",
  storageBucket: "fir-blog-5e369.appspot.com",
  messagingSenderId: "485782035622",
  appId: "1:485782035622:web:4a4a042226ab52645b2867",
  measurementId: "G-TLQC7Y2S4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
