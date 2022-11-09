import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import HomeServiceCard from './HomeServiceCard';
import useTitle from '../../Hooks/useTitle';

const Home = () => {
    useTitle('Home')
    const { data } = useLoaderData();
    const { services } = data;
    console.log(services);
    return (
        <>

            <section className="dark:bg-gray-800 dark:text-gray-100">
                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                    <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">

                        image headers


                    </div>
                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl">Ac mattis
                            <span className="dark:text-purple-400">senectus</span>erat pharetra
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12">Dictum aliquam porta in condimentum ac integer
                            urpis pulvinar, est scelerisque ligula sem
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold rounded dark:bg-purple-400 dark:text-gray-900">Suspendisse</a>
                            <a rel="noopener noreferrer" href="#" className="px-8 py-3 text-lg font-semibold border rounded dark:border-gray-100">Malesuada</a>
                        </div>
                    </div>
                </div>
            </section>
            <section className='flex flex-col space-y-8 py-20'>
                <h2> SERVICE </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {
                        services.map(service =>
                            <HomeServiceCard
                                key={service?._id}
                                service={service}
                            ></HomeServiceCard>

                        )
                    }
                </div>

                <div className='text-center'>
                    <Link to='/services' className="px-8 w-4/5 py-3 font-semibold rounded-md dark:bg-purple-700  bg-gray-400 text-white hover:bg-purple-800 dark:hover:bg-purple-900 dark:text-white "> Load More .... </Link>
                </div>
            </section>



        </>
    );
};

export default Home;