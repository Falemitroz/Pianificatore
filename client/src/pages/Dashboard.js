import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

const Dashboard = () => {
    return (
        <>
         <ResponsiveAppBar />
         <h1>lista Viaggi</h1>
            <a href='/trip-details'>TripDetails</a>
        </>
    );
};

export default Dashboard;