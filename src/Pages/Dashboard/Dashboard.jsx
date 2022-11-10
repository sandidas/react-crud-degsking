import React from 'react';
import useTitle from '../../Hooks/useTitle';

const Dashboard = () => {
    useTitle('Dashboard');
    return (
        <div className='text-3xl'>
            Welcome to the Dashboard!
        </div>
    );
};

export default Dashboard;