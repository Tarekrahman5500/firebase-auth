import React from 'react';
import {Link} from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const Login = () => {

    const { user, error, SignInWithGoogle} =  UseAuth()
    return (
        <div>
            <h2>Login</h2>
            <button onClick={SignInWithGoogle}>Google Sign In</button>
            <br/>
            <Link to='/register'>New User?</Link>
        </div>
    );
};

export default Login;