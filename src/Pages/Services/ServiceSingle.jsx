import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import useTitle from '../../Hooks/useTitle';




const ServiceSingle = () => {
    useTitle('Services');
    const { setLoading, showAlert } = useContext(AuthContext);
    const [featchData, setFeatchData] = useState([]);
    const { id } = useParams()

    // PAGINATION
    const [totalNumberOfDocument, setTotalNumberOfDocument] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // current page 
    const [itemsPerPage, setItemsPerPage] = useState(6) // items per page
    // by using Math.ceil we can get upper value. for example. 11.3 conver to 12.
    const [spliceStart, setSpliceStart] = useState(0);
    const [spliceEnd, setSpliceEnd] = useState(5);

    const totalPages = Math.ceil(totalNumberOfDocument / itemsPerPage);

    useEffect(() => {
        setLoading(true);
        const dataFetchByPagination = async () => {
            const location = `http://localhost:5000/service/${id}`;
            const settings = {
                method: 'GET',
            };
            try {
                await fetch(location, settings)
                    .then(res => res.json())
                    .then(data => {
                        setFeatchData(data.data);
                        setTotalNumberOfDocument(data.data.totalItems);
                    })
            } catch (error) {
                showAlert('danger', 'Fail to load')
            }
        }
        dataFetchByPagination();
        setLoading(false);
        // return
    }, [currentPage, itemsPerPage])
    const generalPageClasses = "px-9 py-3 font-bold shadow-md dark:bg-gray-900 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800 rounded-md";
    const selectedPageClasses = "px-9 py-3  font-bold shadow-md dark:bg-pink-700 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800 rounded-md";


    console.log(featchData);

    return (
        <div>
            <section>
                <div className="pt-5 rounded-md pb-8 px-5 shadow-md dark:bg-gray-900 dark:text-gray-100">

                    <div className="block py-5">
                        <h3 className="text-2xl font-bold dark:text-purple-400 pb-2">

                            {featchData?.title}

                        </h3>
                        <p className="flex items-center">
                            {featchData?.service_categories}
                        </p>
                    </div>


                    <div className="space-y-6 flex flex-col">
                        <div className="space-y-">
                            <img src={featchData?.thumbnail} alt="" className="block object-cover object-center w-full   rounded-md dark:bg-gray-500" />
                            <div className="flex pt-4 items-center text-xs justify-between">
                                <span>Total Reviews: {featchData?.total_reviews}</span>
                                <span>Average Reviews: {featchData?.total_reviews_average}</span>
                            </div>
                        </div>
                        <div className="space-y-2">

                            <div className="leading-snug dark:text-gray-400">


                                <div className='flex flex-col space-y-4' dangerouslySetInnerHTML={{ __html: featchData?.description }}>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center'>
                            <div className='font-bold text-xl'>
                                ${featchData?.price}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </div>
    );
};

export default ServiceSingle;