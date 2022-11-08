import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/UserContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <Loader />
    }
    if (user && user?.uid) {
        return (
            <> {children} </>
        )
    } else {
        return <Navigate to='/'></Navigate>
    }
};

export default PrivateRoute;