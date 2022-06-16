import React from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import UseAuth from "../Hooks/UseAuth";

const PrivateRoute = () => {

    const {user} = UseAuth()
    const location = useLocation();
    return user.email ? <Outlet/> : <Navigate
        to={'/login'}
        state={{ from: location }} // <-- pass in route state
        replace
    />

};

export default PrivateRoute;