import React from 'react';
import UseAuth from "../Hooks/UseAuth";

const Home = () => {

    const {user} = UseAuth()
    return (
        <div>
            <h1>Home</h1>
            <h5>Name: {user.displayName}</h5>
        </div>
    );
};

export default Home;