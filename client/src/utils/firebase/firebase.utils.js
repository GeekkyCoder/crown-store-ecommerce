import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb7WOHDz2vSUgxIeLf_yivK0NUICpFuEA",
  authDomain: "my-crown-store.firebaseapp.com",
  projectId: "my-crown-store",
  storageBucket: "my-crown-store.appspot.com",
  messagingSenderId: "296498247829",
  appId: "1:296498247829:web:139bfb00af22d237c2839c",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

// const googleProvider = new GoogleAuthProvider();


export const onAuthUserStateChange = (callbackfn) => {
  onAuthStateChanged(auth, callbackfn);
};



export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createUserAuthWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserWithDocument = async (
  userAuth,
  additionalInformation
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapShot = await getDoc(userDocRef);

  const createdAt = new Date();

  const { displayName, email } = userAuth;

  if (!userSnapShot.exists()) {
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (err) {
      console.log(`something went wrong, ${err}`);
    }
  }

  return userDocRef;
};
