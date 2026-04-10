// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdkyg9GHM44LzOqij_N5hNuZ9rQywZW6Y",
  authDomain: "mens-fashion-store-5da6b.firebaseapp.com",
  projectId: "mens-fashion-store-5da6b",
  storageBucket: "mens-fashion-store-5da6b.firebasestorage.app",
  messagingSenderId: "407906966887",
  appId: "1:407906966887:web:13c74c0b7b94be76a163c2",
  measurementId: "G-R38KJKC716"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);