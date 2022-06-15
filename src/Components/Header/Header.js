import React from 'react';
import {Link} from "react-router-dom";
import './Header.css'
import UseAuth from "../Hooks/UseAuth";

const Header = () => {

    const {user, SignOut} =UseAuth()
    return (
        <div className="header">
            <Link to='/home'>Home</Link>
            <Link to='/shipping'>Shipping</Link>
            <Link to='/login'>Login</Link>
            <Link to='/order'>order</Link>
            <Link to='/register'>Register</Link>
            <span>{user.displayName}</span>
            {user.email && <button onClick={SignOut}>Log out</button>}
        </div>
    );
};

export default Header;