/*****************************************************************************
 * Import
 *****************************************************************************/
import { handleEmailLogin, handleCreateEmailUser, checkSignInMethods } from "utils/auth";
import ExtensionConfig from "extension/config";
/* import "setup/firebase"; */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
/* export const db = getFirestore(app); */
/* export const analytics = getAnalytics(app); */


const browser = ExtensionConfig.browserBase;

/*****************************************************************************
 * Background
 *****************************************************************************/

/* const config = require("../../setup/FIREBASE_CONFIG").firebaseConfig; */
/* firebase.initializeApp(config); */

var user = null;
const auth = getAuth();
const unlisten = onAuthStateChanged(
  auth,
  authUser => {
    user = authUser;
  },
);

if (!browser?.runtime) {
  console.log("Browser runtime not found!")
} else {
  console.log("Browser runtime works!")
  
  browser.runtime.onInstalled.addListener(() => {
    console.log("INSTALLED");
  });

  browser.runtime.onMessage.addListener(function (
    msg,
    sender,
    sendResponse
  ) {
    console.log("onMessage", msg);
    if (msg.type === "login") {
      const err = handleEmailLogin(msg.email, msg.password)
        .then(err => {
          if (err) {
            console.log(err.code);
            sendResponse(err);
          } else {
            console.log("SUCCESS");
            sendResponse(null);
          }
        });      
      return true;
    } else if (msg.type === "token") {
      const err = handleEmailLogin(msg.email, msg.password)
        .then(err => {
          if (err) {
            console.log(err.code);
            sendResponse(err);
          } else {
            console.log("SUCCESS");
            sendResponse(null);
          }
        });      
      return true;
    } else if (msg.type === "fetchUser") {
      console.log("USER", user?.uid)
      sendResponse(user?.uid);
    }
  });
}


export default {};
