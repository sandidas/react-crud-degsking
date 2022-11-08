import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Components/Loader/Loader';
import { AuthContext } from '../Context/UserContext';
import LeftSideBar from '../Components/LeftSideBar/LeftSideBar';
//=====================================
//
//
//
// THIS ROUTE ONLY FOR CLIENT TYPE OF USER
// WE HAVE 3 KINDS OF USER TYPE
// guest (visitors), client, & Admin
//
//
//
//
//=====================================
const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [showHideSideNav, setShowHideSideNav] = useState(false);

    if (loading) {
        return <Loader />
    }
    if (user && user?.uid) {
        return (
            <>

                <div className='grid grid-cols-1 lg:grid-cols-12 mx-auto min-h-[90vh]'>

                    <aside className={showHideSideNav ? 'lg:col-span-3 dark:bg-gray-900 dark:text-gray-100 bg-slate-100 backdrop-blur-2xl transition-colors duration-500' : 'hidden lg:col-span-3 lg:block dark:bg-gray-900 dark:text-gray-100 bg-slate-100 backdrop-blur-2xl transition-colors duration-500'}>
                        <LeftSideBar></LeftSideBar>
                    </aside>

                    <div className='lg:col-span-9 px-5  dark:bg-gray-800 dark:text-gray-100 backdrop-blur-2xl transition-colors duration-500'>
                        <div className='dark:bg-gray-900 px-5 py-10 rounded-md border border-slate-100 dark:border-none shadow-md'>
                            {children}
                        </div>
                    </div>
                </div>


            </>
        )
    } else {
        return <Navigate to='/'></Navigate>
    }
};

export default PrivateRoute;