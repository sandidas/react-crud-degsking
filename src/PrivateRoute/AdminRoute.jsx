import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/UserContext';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    console.log(user);

    if (user && user?.uid) {
        return (
            <> {children} </>
        )
    } else {
        return <Navigate to='/'></Navigate>
    }
};

export default AdminRoute;