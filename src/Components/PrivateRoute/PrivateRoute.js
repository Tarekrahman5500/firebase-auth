import React from 'react';
import {Navigate, Outlet} from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const PrivateRoute = () => {

    const {user} = UseAuth()
    return user.email ? <Outlet/> : <Navigate to='/login'/>

};

export default PrivateRoute;