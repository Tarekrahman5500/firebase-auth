import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const InitializeAuth = () => {
    // Initialize Firebase
    initializeApp(firebaseConfig);
}

export  default  InitializeAuth
