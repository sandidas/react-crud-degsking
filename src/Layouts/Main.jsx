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

            <div className='grid grid-cols-1 lg:grid-cols-12 mx-auto min-h-[90vh]'>

                <aside className={showHideSideNav ? 'lg:col-span-3 dark:bg-gray-900 dark:text-gray-100 bg-slate-100 backdrop-blur-2xl transition-colors duration-500' : 'hidden lg:col-span-3 lg:block dark:bg-gray-900 dark:text-gray-100 bg-slate-100 backdrop-blur-2xl transition-colors duration-500'}>
                    <LeftSideBar></LeftSideBar>
                </aside>

                <div className='lg:col-span-9 p-5  dark:bg-gray-800 dark:text-gray-100 backdrop-blur-2xl transition-colors duration-500'>
                    <div className='dark:bg-gray-900 px-5 py-10 rounded-md border border-slate-100 dark:border-none shadow-md'>


                        <Outlet></Outlet>



                    </div>
                </div>
            </div>

            <footer className='dark:bg-gray-900 dark:text-gray-100 bg-slate-100 backdrop-blur-2xl transition-colors duration-500 py-5'>
                <Footer></Footer>
            </footer>
        </>
    );
};

export default Main;