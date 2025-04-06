import React from 'react';
import ExpenseItem from '../components/ExpenseItem';

const Home = () => {

    return (
        <>
            <h1>Home</h1>
            <a href='/login'>Accedi</a>
            <a href='/dashboard'>Dashboard</a>
            <button>{<ExpenseItem />}</button>
        </>
    );
};

export default Home;