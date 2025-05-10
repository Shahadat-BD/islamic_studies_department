// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwzXcX7j6M-4pJOccqbvMD9GY7nRCrApw",
  authDomain: "islamic-dept-auth.firebaseapp.com",
  projectId: "islamic-dept-auth",
  storageBucket: "islamic-dept-auth.firebasestorage.app",
  messagingSenderId: "639806941586",
  appId: "1:639806941586:web:50c27cff76f9c8bbcaf94b",
  measurementId: "G-GL87T9WHXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app