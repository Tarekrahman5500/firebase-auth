import React from 'react';
import {Link} from "react-router-dom";

const Register = () => {
    return (
        <div>
            <h2>Register Now</h2>
            <form>
                <input type="email" required/>
                <br/>
                <input type="password" required/>
                <br/>
                <input type="submit" value='submit'/>
            </form>
            <Link to='/login'>Already Account?</Link>
        </div>
    );
};

export default Register;