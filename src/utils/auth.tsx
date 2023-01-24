/*****************************************************************************
 * Import
 *****************************************************************************/
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithCredential,
} from "firebase/auth";

/*****************************************************************************
 * Export
 *****************************************************************************/

export const handleGoogleLogin = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export const handleTokenLogin = async (result) => {
  //const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const credential = GoogleAuthProvider.credentialFromResult(result);
  return await signInWithCredential(auth, credential)
    .then((ahh) => {
      console.log(ahh);
      return ahh;
    })
}

export const handleEmailLogin = async (email, password) => {
  const auth = getAuth();
  console.log(auth);
  return await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { error: null, user: userCredential.user, userCredential: userCredential }
    })
    .catch((error) => {
      return { ...error, message: parseErrorMessage(error) };
    });
}

export const handleCreateEmailUser = async (email, password) => {
  const auth = getAuth();
  return await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { error: null, user: userCredential.user, userCredential: userCredential }
    })
    .catch((error) => {
      return { ...error, message: parseErrorMessage(error) };
    });
}

export const checkSignInMethods = async (email) => {
  const auth = getAuth();
  return await fetchSignInMethodsForEmail(auth, email)
    .then((methods) => {
      console.log(methods);
      return { error: null, list: methods }
    })
    .catch((error) => {
      console.log(error);
      return { error: { ...error, message: parseErrorMessage(error)}, list: [] };
    });
}

const parseErrorMessage = (error) => {
  console.log(error.code);
  return {
    "auth/email-already-exists" : "E-mail already in use!",
    "auth/invalid-email" : "Invalid e-mail format!",
    "auth/invalid-password" : "Invalid password format!",
    "auth/wrong-password" : "Incorrect email or password!",
    "auth/user-not-found" : "A user does not exist for this e-mail address!",
    "auth/weak-password" : "Password too weak!",
  }[error.code] || "Login error!";
}

export const validateEmailFormat = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return !!email && !!email.match(emailRegex);
}

export function validatePasswordFormat(password) {
  const Lt = "a-zA-Z"; /* letters */
  const Nu = "0-9"; /* numbers */
  const Sp = "@#$%^&+=!_\\-()"; /* specials */
  const LNS = `${Lt}${Nu}${Sp}`;
  const passwordRegex = new RegExp(`^(?=.*[${Nu}])(?=.*[${Lt}])[${LNS}]{6,}$`);

  return !!password && !!password.match(passwordRegex);
}
