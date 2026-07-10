// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo-X-GXiNO75aJ6Kb-U42wCZ4o1syTtAo",
  authDomain: "netflixgpt-14796.firebaseapp.com",
  projectId: "netflixgpt-14796",
  storageBucket: "netflixgpt-14796.firebasestorage.app",
  messagingSenderId: "1049212783109",
  appId: "1:1049212783109:web:37502a6864da0585c32a6c",
  measurementId: "G-362M0LQ0NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();