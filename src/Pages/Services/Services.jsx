import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import useTitle from '../../Hooks/useTitle';
import HomeServiceCard from '../Home/HomeServiceCard';

const Services = () => {
    useTitle('Services');
    const { setLoading, showAlert } = useContext(AuthContext);
    const [featchData, setFeatchData] = useState([]);



    // PAGINATION
    const [totalNumberOfDocument, setTotalNumberOfDocument] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // current page 
    const [itemsPerPage, setItemsPerPage] = useState(6) // items per page
    // by using Math.ceil we can get upper value. for example. 11.3 conver to 12.
    const [spliceStart, setSpliceStart] = useState(0);
    const [spliceEnd, setSpliceEnd] = useState(5);

    const totalPages = Math.ceil(totalNumberOfDocument / itemsPerPage);

    useEffect(() => {
         
        const dataFetchByPagination = async () => {
            const location = `https://server-side-xi.vercel.app/servicespublic?page=${currentPage}&size=${itemsPerPage}`;
            try {
                await fetch(location)
                    .then(res => res.json())
                    .then(data => {
                        setFeatchData(data.data.services);
                        setTotalNumberOfDocument(data.data.totalItems);
                    })
            } catch (error) {
                showAlert('danger', 'Fail to load')
            }
        }
        dataFetchByPagination();
      
        // return
    }, [currentPage, itemsPerPage])
    const generalPageClasses = "px-9 py-3 font-bold shadow-md dark:bg-gray-900 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800 rounded-md";
    const selectedPageClasses = "px-9 py-3  font-bold shadow-md dark:bg-pink-700 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800 rounded-md";


    return (
        <div>
            <div className='py-12 text-center'>
                <h1 className='text-7xl font-bold'> SERVICES </h1>
                <p>Sky has no limit</p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                {
                    featchData &&
                    featchData.map(service =>
                        <HomeServiceCard
                            key={service?._id}
                            service={service}
                        ></HomeServiceCard>

                    )
                }
            </div>
            <div className='py-10 text-center'>
                <p className='pb-5'>Current Page {currentPage}, Selected {itemsPerPage} </p>
                <div className="flex justify-center space-x-1 dark:text-gray-100">

                    {(spliceStart != 0) &&
                        <button onClick={() => { setSpliceEnd((current) => current - 5), setSpliceStart((current) => current - 5) }}
                            className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">

                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>

                        </button>
                    }

                    {/* [...Array(totalPages).keys()] print keys */}
                    {/**
                             * printing pages number
                             */}

                    {
                        [...Array(totalPages).keys()].slice(spliceStart, spliceEnd).map(pageNum =>
                            <button onClick={() => setCurrentPage(pageNum + 1)} key={pageNum} type="button" title="Page 1" className={currentPage === (pageNum + 1) ? selectedPageClasses : generalPageClasses}>

                                {
                                    pageNum + 1
                                }

                            </button>
                        )
                    }
                    {(totalPages > spliceEnd) &&
                        <button onClick={() => { setSpliceEnd((current) => current + 5), setSpliceStart((current) => current + 5) }} className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">


                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>


                        </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Services;