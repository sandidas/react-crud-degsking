import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import useTitle from '../../Hooks/useTitle';
import Loader from '../../Components/Loader/Loader';
import { BsChevronCompactLeft, BsExclamationCircle } from "react-icons/bs";
import { Button, Modal } from 'flowbite-react';
import ClientServiceRow from './ClientServiceRow';
import { useNavigate } from 'react-router-dom';
const ClientsServices = () => {
    useTitle('My Services');

    const { user, showAlert, setLoading, loading, userSignout } = useContext(AuthContext);
    const [featchData, setFeatchData] = useState([]);
    const [popupConfirm, setPopupConfirm] = useState(false);
    const [showInfo, setShowInfo] = useState('');
    const [singleItemInfo, setSingleItemInfo] = useState('');
    const navigate = useNavigate();

    // get-render data by pagination
    //==================
    // count : loaded
    // per page: 10
    // pages: count / page
    /// pages
    const [totalNumberOfDocument, setTotalNumberOfDocument] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // current page 
    const [itemsPerPage, setItemsPerPage] = useState(10) // items per page
    // by using Math.ceil we can get upper value. for example. 11.3 conver to 12.

    const [spliceStart, setSpliceStart] = useState(0);
    const [spliceEnd, setSpliceEnd] = useState(5);

    const totalPages = Math.ceil(totalNumberOfDocument / itemsPerPage);

    // console.log(user.uid);
    useEffect(() => {
        let isSubscribed = true;

        const dataFetchByPagination = async () => {
            const location = `https://server-side-xi.vercel.app/services?page=${currentPage}&size=${itemsPerPage}&uid=${user.uid}`;
            const settings = {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('ds-token')}`
                }
            };
            try {
                const apiFetch = await fetch(location, settings)
                const jsonData = await apiFetch.json();

                // JWToken validation 
                if (!jsonData.success && jsonData.status === 401) {
                    showAlert('danger', `${jsonData.message}`)
                    userSignout() // if jwt is invalid user sign out
                        .then(() => {
                            navigate('/login');
                        })
                        .catch((error) => {
                            navigate('/login');
                        })
                } else if (!jsonData.success) {
                    showAlert('danger', `${jsonData.message}`)
                } else {
                    setFeatchData(jsonData.data.services);
                    setTotalNumberOfDocument(jsonData.data.totalItems);
                }
            } catch (error) {

             //   console.log(error);
            }
        }
        dataFetchByPagination()
            .catch(console.error);

        // cancel any future `setData`
        return () => isSubscribed = false;
    }, [currentPage, itemsPerPage])


    // class Names for button
    const generalPageClasses = "px-3 py-1 text-sm font-semibold shadow-md dark:bg-gray-900 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800";
    const selectedPageClasses = "px-3 py-1 text-sm font-semibold shadow-md dark:bg-pink-700 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800";


    const deleteConfirm = (event) => {
        if (singleItemInfo?._id) {
            singleServiceDelete(singleItemInfo?._id)
        }
    }
    const singleServiceDelete = async (id) => {
        const location = `https://server-side-xi.vercel.app/service/${id}`;
        const settings = {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('ds-token')}`
            }
        };
        try {
            const fetchResponse = await fetch(location, settings);
            const data = await fetchResponse.json();
            if (data.success === true) {
                showAlert('success', data.message)
                const newResult = featchData.filter(u => u._id != id);
                setFeatchData(newResult)
                // console.log(newResult);
                setSingleItemInfo('')

            } else if (data.success === false) {
                showAlert('error', data.message)
            } else {
                showAlert('danger', data.message)
            }
        } catch (error) {
            // console.log(error);
            showAlert('danger', "fail to communicate with server")
        }
    }

    if (loading) {
        return <Loader />
    } else if (totalNumberOfDocument === 0) {

        return (
            <div className='text-center'> No services were added by you </div>
        )
    } else {

        return (
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                {popupConfirm &&
                    <React.Fragment>
                        <Modal
                            show={popupConfirm}
                            size="md"
                            popup={true}
                            onClose={() => setPopupConfirm(false)}
                        >
                            <Modal.Header />
                            <Modal.Body>
                                <div className="text-center">
                                    <BsExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Are you sure you want to delete?
                                    </h3>
                                    <div className="flex justify-center gap-4">
                                        <Button
                                            color="gray"
                                            onClick={() => setPopupConfirm(false)}
                                        >
                                            No, Cancel
                                        </Button>

                                        <Button
                                            className='bg-red-600 text-white'
                                            onClick={() => { deleteConfirm(true), setPopupConfirm(false) }}
                                        >
                                            Yes, Delete Please
                                        </Button>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </React.Fragment>
                }
                <div className="mb-4 font-semibold leading-tight flex xl:justify-between flex-row">
                    <h2 className='text-2xl'>Services</h2>
                    <div className='w-fit'>
                        {/* select how many document want to show */}
                        <select
                            onChange={event => setItemsPerPage(event.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option className='bg-yellow-400' value={itemsPerPage}>{itemsPerPage}</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs table-auto">

                        <thead className="dark:bg-gray-700">
                            <tr className="text-left ">
                                <th className="p-3">ID #</th>
                                <th className="p-3">Title</th>
                                <th className="p-3">Ratting</th>
                                <th className="p-3">Action</th>

                            </tr>
                        </thead>

                        <tbody className=''>
                            {
                                featchData &&
                                featchData?.map(da =>
                                    <ClientServiceRow
                                        key={da._id}
                                        da={da}
                                        deleteConfirm={deleteConfirm}
                                        showInfo={showInfo}
                                        setPopupConfirm={setPopupConfirm}
                                        popupConfirm={popupConfirm}
                                        setSingleItemInfo={setSingleItemInfo}

                                    >
                                    </ClientServiceRow>
                                )
                            }

                        </tbody>
                    </table>
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
            </div >
        );
    }
};

export default ClientsServices;