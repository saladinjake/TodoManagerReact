
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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
