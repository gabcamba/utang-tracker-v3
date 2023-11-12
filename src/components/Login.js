import React from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {auth, provider} from "../firestore";

// const auth = getAuth();

const login = () => {
  signInWithRedirect(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
    //   const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('USER: ', user);

      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const print = () => {
  console.log(auth.currentUser?.email);
};

const signout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
const LoginPage = () => {
  return (
    <div style={{ height: "100vh", justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <button onClick={() => login()}>SIGN IN</button>
      <button onClick={() => print()}>display auth</button>
      <button onClick={() => signout()}>sign out</button>
    </div>
  );
};

export default LoginPage;
