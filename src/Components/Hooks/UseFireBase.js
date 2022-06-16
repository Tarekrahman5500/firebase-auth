import {useEffect, useState} from "react";
import InitializeAuth from "../../Firebase/firebase.initialize";
import {getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut} from "firebase/auth";

InitializeAuth()
const UseFireBase = () => {

    const [user, setUser] = useState({})
    const [error, setError] = useState('')

    const auth = getAuth()
    const GoogleProvider = new GoogleAuthProvider();

    const SignInWithGoogle = () => {

      return   signInWithPopup(auth, GoogleProvider)

    }
    useEffect(() => {

        onAuthStateChanged(auth, user => {
            if (user) {
              //  console.log('inside state', user)
                setUser(user)
            }
        })
    }, [auth])

    const SignOut = () => {
      //  console.log('sign out call')
        signOut(auth).then(() => {
            setUser({})
        })
    }
    return {
        user,
        error,
        setError,
        SignInWithGoogle,
        SignOut
    }

}

export default UseFireBase