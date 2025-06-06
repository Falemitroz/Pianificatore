import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Home = () => {

    const { user } = useContext(AuthContext);

    return (
        <>
            <h1>Home</h1>
            {user ? <a href='/dashboard'>Dashboard</a> : <a href='/login'>Accedi</a>}
        </>
    );
};

export default Home;