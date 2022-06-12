import {getAuth, signOut, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";
import InitializeAuth from "./Firebase/firebase.initialize";
import {useState} from "react";

InitializeAuth()

const provider = new GoogleAuthProvider();

const GitProvider = new GithubAuthProvider();

function App() {

    const [user, SetUser] = useState({})
    const auth = getAuth()
    const handleGoogleSignInWithPopup = () => {

        signInWithPopup(auth, provider)
            .then(result => {
                const {displayName, email, photoURL} = result.user
                const logInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                SetUser(logInUser)
                console.log(result.user)
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
            })
    }

    const handleGithubSignInWithPopup = () => {

        signInWithPopup(auth, GitProvider)
            .then((result) => {
                // This gives you a GitHub Access Token. You can use it to access the GitHub API.
                const credential = GithubAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // The signed-in user info.
                const {displayName, email, photoURL} = result.user
                const logInUser = {
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                SetUser(logInUser)

                // ...
            }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GithubAuthProvider.credentialFromError(error);
            // ...
        });

    }

    const handleSignOut = () => {

        signOut(auth).then(() => {
            // Sign-out successful.
            SetUser({})
        }).catch((error) => {
            // An error happened.

        });
    }

    return (
        <div className="App">
            { !user.name ?
                <>
                <button onClick={handleGoogleSignInWithPopup}>Google Sign in</button>
                <button onClick={handleGithubSignInWithPopup}>Github Sign in</button>
            </>:
                <button onClick={handleSignOut}>Sign out</button>
            }
            <br/>
            {
                user.email &&
                <>
                    <h2>Name: {user.name}</h2>
                    <p>Email: {user.email}</p>
                    <img src={user.photo} alt={user.name}/>
                </>
            }
        </div>
    );
}

export default App;
