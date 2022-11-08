import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/UserContext';

const CheckAuth = ({ children }) => {
    const { user, showAlert, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    console.log(user);


    if (!user) {
        return children;
    } else {
        return <Navigate to='/login' state={{ from: location }} replace  ></Navigate>
    }

};

export default CheckAuth;