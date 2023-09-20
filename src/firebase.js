// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAClzOJaJfw8W99MGe9jSfEKXAZaNOt9E8",
  authDomain: "hngx-task-3-61764.firebaseapp.com",
  projectId: "hngx-task-3-61764",
  storageBucket: "hngx-task-3-61764.appspot.com",
  messagingSenderId: "361705208342",
  appId: "1:361705208342:web:7e4e0d7bfca22965919337"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export default app