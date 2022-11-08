import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import LeftSideBar from '../Components/LeftSideBar/LeftSideBar';


const Main = () => {
    // state to show/hide left side bar :: 
    // left sidebar showing by default on larger screen. sm and md need to click on button to show/hide
    const [showHideSideNav, setShowHideSideNav] = useState(false);
    const location = useLocation();




    return (
        <>
            {/* In header sending the state value to toggle by header button to show/hide left side bar */}
            <header className='dark:bg-gray-900 dark:text-gray-100 bg-slate-100 top-0 sticky backdrop-blur-2xl transition-colors duration-500 z-50'>
                <Header showHideSideNav={showHideSideNav} setShowHideSideNav={setShowHideSideNav}>
                </Header>
            </header>

            <div className='min-h-[90vh] dark:bg-gray-800 dark:text-gray-100 backdrop-blur-2xl transition-colors duration-500 p-5'>
                <div className='max-w-[95%] mx-auto'>
                    <Outlet></Outlet>
                </div>
            </div>

            <footer className='dark:bg-gray-900 dark:text-gray-100 bg-slate-100 backdrop-blur-2xl transition-colors duration-500 py-5'>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default Main;