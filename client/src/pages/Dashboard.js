import React from 'react';
import UserProfile from '../components/UserProfile';

const Dashboard = () => {
    return (
        <>
            <UserProfile />
            <a href='/trip-details'>TripDetails</a>
        </>
    );
};

export default Dashboard;