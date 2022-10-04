// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
/* import { getAnalytics } from "firebase/analytics"; */

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyHlYlsZn37utjbre9Vc0xspDyUWVKIpw",
  authDomain: "producto-1cba1.firebaseapp.com",
  databaseURL: "https://producto-1cba1-default-rtdb.firebaseio.com",
  projectId: "producto-1cba1",
  storageBucket: "producto-1cba1.appspot.com",
  messagingSenderId: "115822604258",
  appId: "1:115822604258:web:891f8bb9da1ffe905a53bb",
  measurementId: "G-SVEHL18MZH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export
export const db = getFirestore(app);
/* export const analytics = getAnalytics(app); */
