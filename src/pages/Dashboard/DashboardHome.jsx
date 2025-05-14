import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const DashboardHome = () => {
    const {user} = useContext(AuthContext)
    return (
        <div>
            <h1 className='font-bold text-3xl'>welcome to <span className='text-green-600 font-bold text-3xl'>{user.name}</span> </h1>
        </div>
    );
};

export default DashboardHome;