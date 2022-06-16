import React from 'react';
import {Link, useLocation, useNavigate} from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const Login = () => {

    const {user, setError, SignInWithGoogle} = UseAuth()
    const location = useLocation()
    const history = useNavigate()
    const url = location.state?.from || '/'

    const handleLogin = () => {
        SignInWithGoogle()
            .then(result => {
                history(url)
            })
            .catch(error => {
                setError(error)
            })
    }
        return (
            <div>
                <h2>Login</h2>
                <button onClick={handleLogin}>Google Sign In</button>
                <br/>
                <Link to='/register'>New User?</Link>
            </div>
        );
    };


export default Login;