import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

const InitializeAuth = () => {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
}

export  default  InitializeAuth
