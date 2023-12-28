// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2x29tZfziJRPDlt1BQFChoFDQKuXfsOE",
  authDomain: "studyapp-14658.firebaseapp.com",
  databaseURL: "https://studyapp-14658-default-rtdb.firebaseio.com",
  projectId: "studyapp-14658",
  storageBucket: "studyapp-14658.appspot.com",
  messagingSenderId: "101460716063",
  appId: "1:101460716063:web:e86ee308a1e393cc90832a",
  measurementId: "G-82S3JZKWJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore();