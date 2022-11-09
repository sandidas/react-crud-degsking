import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/UserContext';

const NotForLoggedInUser = ({ children }) => {
    const { user, showAlert, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    if (loading) {
        return <Loader />
    } else {
        if (!user || !user.uid) {
            return children
        } else {
            return <Navigate to='/dashboard' state={{ from: location }} replace  ></Navigate>
        }
    }


};

export default NotForLoggedInUser;