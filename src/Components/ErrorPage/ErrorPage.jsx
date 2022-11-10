import React from "react";
import { Link, useRouteError } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const ErrorPage = () => {
    // To check error
    const error = useRouteError();
    // console.log(error);
    return (
        <>
            <Header></Header>
            <div className="pt-5 pb-8 px-5 shadow-md dark:bg-gray-900 dark:text-gray-100 mt-5 flex flex-col">
                <div className="flex flex-col items-center pt-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-24 h-24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                    </svg>

                    {error && (
                        <div className="text-center xl:text-6xl text-2xl">
                            <div className="py-5"> {error?.statusText}</div>
                            <div className="text-yellow-400 font-extrabold">{error?.status || error?.message}</div>
                        </div>
                    )}
                    <Link className="py-3 px-6 bg-red-600 rounded font-bold text-yellow-50 my-6" to="/">Back to Home</Link>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default ErrorPage;
