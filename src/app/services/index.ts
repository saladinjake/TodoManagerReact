
import { initializeApp } from "firebase/app";
import { getAuth, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAHfcOjpYZ0xC_tL-9CHbxdWIqF-319ug8",
  authDomain: "savannah-todos.firebaseapp.com",
  projectId: "savannah-todos",
  storageBucket: "savannah-todos.appspot.com",
  messagingSenderId: "732881615681",
  appId: "1:732881615681:web:9b1e58a784a18474e83fc0",
  measurementId: "G-VVJV7VH682",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Sign in and sign out soscial auth
export const signInWithProvider = (provider) => signInWithPopup(auth,provider);
export const signOutOfProvider = () => signOut();
export const facebook = new FacebookAuthProvider();
const google = new GoogleAuthProvider();
google.setCustomParameters({ prompt: "select_account" });
export google


