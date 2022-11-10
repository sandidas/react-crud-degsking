import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import HomeServiceCard from './HomeServiceCard';
import useTitle from '../../Hooks/useTitle';

const Home = () => {
    useTitle('Home')
    const { data } = useLoaderData();
    const { services } = data;
    return (
        <>

            <section className="dark:bg-gray-800 dark:text-gray-100">

                <div>

                </div>


                <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between bg-[url('/wedddignbg.jpg')]" >

                    <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                        <h1 className="text-5xl font-bold leading-none sm:text-6xl dark:text-gray-700">
                            Subit your review
                            <span className="dark:text-purple-800"> & </span>Help others
                        </h1>
                        <p className="mt-6 mb-8 text-lg sm:mb-12 dark:text-gray-600">
                            To find best wedding photographer.
                        </p>
                        <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                            <Link to='services' className="px-8 py-3 text-lg font-semibold rounded dark:bg-purple-800 bg-purple-800 dark:text-white text-white ">Services</Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center xl:p-6 mt-8 lg:mt-0 xl:h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">


                    </div>
                </div>
            </section>


            <section className='flex flex-col space-y-8 py-20'>
                <div className='py-12 text-center'>
                    <h1 className='text-7xl font-bold'> SERVICES </h1>
                    <p>Sky has no limit</p>
                </div>
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




            <section className='flex flex-col space-y-8 py-20'>
                <div className='py-12 text-center'>
                    <h1 className='text-7xl font-bold'> OPINION </h1>
                    <p>Before judge! think, who are you?</p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>



                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-900">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-purple-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>

                                I am so glad that I stumbled across Photography. I can’t say enough about how professional  is and the quality of work that he provides. I was so pleased with my session and final photographs, that I will continue to use him in the future.

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-purple-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-purple-400 dark:text-gray-900">
                            <img src="https://source.unsplash.com/50x50/?portrait?1" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 dark:bg-gray-700" />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-900">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-purple-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>

                                was the best photographer I have ever hired. On time. Followed through on everything he said he would do. Would highly recommend him to family, friends and business associates


                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-purple-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-purple-400 dark:text-gray-900">
                            <img src="https://source.unsplash.com/50x50/?portrait?2" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 dark:bg-gray-700" />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 dark:bg-gray-900">
                            <p className="relative px-6 py-1 text-lg italic text-center dark:text-gray-100">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 dark:text-purple-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>
                                creates magic. She has captured the most special moments of my family’s life. I would never hesitate to recommend her to anyone who wants a true professional to create a customized photography experience.
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 dark:text-purple-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg dark:bg-purple-400 dark:text-gray-900">
                            <img src="https://source.unsplash.com/50x50/?portrait?3" alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full dark:bg-gray-500 dark:bg-gray-700" />
                            <p className="text-xl font-semibold leading-tight">Distinctio Animi</p>
                            <p className="text-sm uppercase">Aliquam illum</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='flex flex-col space-y-8 py-20'>
                <div className='py-12 text-center'>
                    <h1 className='text-7xl font-bold'> WHY D'KING </h1>
                    <p>Click your moment keep it life long</p>
                </div>
                <div className='space-y-5 text-center'>

                    <p>We are the KINGS, Helps your to find Best Wedding Photographers in Mumbai! Events such as weddings are about traditions and rituals, about momentous moments, about journeys of discovery and about new relationships. To cement all of that together you need something strong, something beautiful and something everlasting. That’s what True Shades Photography creates for you-beautiful memories that outlive time and space with our specialized Candid Photography</p>

                    <p>
                        In Mumbai, things are always happening and competition is cut-throat, but amidst it all we are there for you, providing artistically and stylistically, the joyous moments of a lifetime. Love may be in the air, but we capture that too by not missing out on those hidden glances, the subtle displays of affection, the latent nuances that emerge stealthily—oblivious to all eyes but that of camera!
                    </p>


                </div>
            </section>

        </>
    );
};

export default Home;