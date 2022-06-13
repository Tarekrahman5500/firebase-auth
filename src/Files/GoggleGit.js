import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile
} from "firebase/auth";
import InitializeAuth from "../Firebase/firebase.initialize";
import {useState} from "react";

InitializeAuth()

const provider = new GoogleAuthProvider();

const GitProvider = new GithubAuthProvider();

const GoggleGit = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [login, setLogin] = useState(false)
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

    const HandleSignIn = event => {
        event.preventDefault()
        console.log('submit')
        // off default
        console.log(email, password)
        if (password.length < 6) {
            setError('password must be at least 6 characters')
            return
        }
        const two = /(?=.*[A-Z].*[A-Z])/
        const special = /(?=.*[!@#$&*])/
        const digits = /(?=.*\d.*\d)/
        const lowercase = /(?=.*[a-z].*[a-z].*[a-z])/
        if (!two.test(password)) {
            setError('password must be at least two uppercase')
            return;
        }

        /*function checkError(regex, password, text) {
            if (regex.test(password)) {
                setError(text)
                console.log(regex)
                return true
            } else {
                setError('')
                return false
            }
        }

        if (checkError(two, password, 'password should has two uppercase letters') ||
            checkError(special, password, 'password should has two special letters') ||
            checkError(digits, password, 'password should has two digits') ||
            checkError(lowercase, password, 'password should has three lowercase letters')
        ) {
            console.log(error)
            return
        }*/
       // console.log(error)
        setError('')

        login? processLogin(email, password): createNewUser(email, password)


    }

    const processLogin = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in

                const user = userCredential.user;
               console.log(user)
                setError('')
            })
            .catch((error) => {
                  setError(error.message)
            });

    }

    const createNewUser = (email, password) => {

      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              verifyEmail()
              setUserName()
              console.log(user)
              setError('')

          })
          .catch((error) => {
              setError(error.message)
          });
  }

  const verifyEmail = () => {

      sendEmailVerification(auth.currentUser)
          .then((result) => {
              // Email verification sent!
              // ...
            //  console.log(result)
          });
  }

  const setUserName = () => {

      updateProfile(auth.currentUser, {
          displayName: name
      }).then(() => {
          // Profile updated!
          // ...
      }).catch((error) => {
          setError(error.message)
      });
  }

  const HandleResetPassword = () => {

      sendPasswordResetEmail(auth, email)
          .then(() => {
              // Password reset email sent!
              // ..
          })
          .catch((error) => {
               setError(error.message)
          });
  }

   const HandleNameChange = event => {
        setName(event.target.value)
   }

    const HandleEmail = event => {
        setEmail(event.target.value)
    }

    const HandlePassword = event => {
        setPassword(event.target.value)
    }

    const toggleLogin = event => {
       setLogin(event.target.checked)
    }

    return (
        <div className='mx-5 mt-2'>
            <form onSubmit={HandleSignIn}>
                <h3 className='text-primary'>{login? 'Login' : 'Register Now'}</h3>
                { !login && <div className="form-group row">
                    <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-10">
                        <input onBlur={HandleNameChange} placeholder='Your Name' type="text" className="form-control"
                               id="inputName"/>
                    </div>
                </div>
                }
                <div className="form-group row">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input onBlur={HandleEmail} type="email" className="form-control" id="inputEmail3" required/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input  onBlur={HandlePassword} type="password" className="form-control" id="inputPassword3"
                               required/>
                    </div>
                </div>
                <div className='row mb-3 mt-2'>
                    <div className="col-sm-10 offset-2">
                        <div className="form-check">
                            <input onChange={toggleLogin} className='form-check-input' type='checkbox' id='check'/>
                            <label className='form-check-label' htmlFor='check'>Login</label>
                        </div>
                    </div>
                </div>

                <div className="form-group row mt-2">
                    <div className="col-sm-10">
                        < div className='row mb-3 text-danger'>{error}</div>
                        <button type="submit" className="btn btn-primary">{login? 'Login' : 'Register'}</button>
                        <button type="button" onChange={HandleResetPassword} className="btn btn-secondary btn-sm">Reset Password</button>
                    </div>
                </div>
            </form>

            <h3> other sign in opposition</h3>
            <br/>

            <div>
                {!user.name ?
                    <>
                        <button onClick={handleGoogleSignInWithPopup}>Google Sign in</button>
                        <button onClick={handleGithubSignInWithPopup}>Github Sign in</button>
                    </> :
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
        </div>

    );
};

export default GoggleGit;