import { Button, Modal } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import UserRow from './UserRow';
import { BsChevronCompactLeft, BsExclamationCircle } from "react-icons/bs";
import Loader from '../../Components/Loader/Loader';
import { async } from '@firebase/util';



const Users = () => {
    const { user, showAlert, setLoading, loading } = useContext(AuthContext);
    const [usersData, setUsersData] = useState([]);
    const [popupConfirm, setPopupConfirm] = useState(false);
    const [singleUserInfo, setSingleUserInfo] = useState('');
    const [usersByEmail, setUsersByEmail] = useState([]);


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


    useEffect(() => {
        const dataFetchByPagination = async () => {
            // https://server-side-xi.vercel.app/userspagination?page=0&size=20
            const location = `https://server-side-xi.vercel.app/userspagination?page=${currentPage}&size=${itemsPerPage}`;
            const settings = {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('ds-token')}`
                }
            };
            try {
                await fetch(location, settings)
                    .then(res => res.json())
                    .then(data => {
                        setUsersData(data.data.users);
                        setTotalNumberOfDocument(data.data.totalItems);
                    })
            } catch (error) {
                showAlert('danger', 'Fail to load')
            }
        }
        dataFetchByPagination();
        return

    }, [currentPage, itemsPerPage])
    // class Names for button
    const generalPageClasses = "px-3 py-1 text-sm font-semibold shadow-md dark:bg-gray-900 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800";
    const selectedPageClasses = "px-3 py-1 text-sm font-semibold shadow-md dark:bg-pink-700 dark:text-purple-400 dark:border-purple-400 hover:bg-gray-400 dark:hover:bg-pink-800";




    /*
    // to load all data
    useEffect(() => {
        const location = "https://server-side-xi.vercel.app/users/";
        const settings = {
            method: 'GET'
        };
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchResponse = await fetch(location, settings);
                const data = await fetchResponse.json();
                // console.log(data);
                if (data) {
                    setLoading(false);
                    // console.log(userData.data);
                    // setUsersData(data.data);

                } else {

                }
                setLoading(false);
            } catch (error) {

            }
        }

        fetchData();
    }, [])
    */
    // console.log(usersData);
    /*
        // search by query ==========================
        // const location = `https://server-side-xi.vercel.app/user`;
        // const location = `https://server-side-xi.vercel.app/user?email=${user?.email}`;
        useEffect(() => {
            const dataFetchByQuery = async () => {
                const location = `https://server-side-xi.vercel.app/user?email=${user?.email}`;
                try {
                    await fetch(location)
                        .then(res => res.json())
                        .then(data => {
                            // setUsersData(data.data)
                        })
                } catch (error) {
                    showAlert('danger', 'Fail to load')
                }
            }
            dataFetchByQuery();
            return
    
        }, [user?.email])
    
    */


    const deleteConfirm = (event) => {
        if (singleUserInfo?._id) {
            singleUserDelete(singleUserInfo?._id)
        }
    }
    const singleUserDelete = async (id) => {
        const location = `https://server-side-xi.vercel.app/user/${id}`;
        const settings = {
            method: 'DELETE'
        };
        try {
            const fetchResponse = await fetch(location, settings);
            const data = await fetchResponse.json();
            if (data.success === true) {
                showAlert('success', data.message)
                const newResult = usersData.filter(u => u._id != id);
                setUsersData(newResult)
                // console.log(newResult);
                setSingleUserInfo('')

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


    const showUserInfo = (id) => {
      //  console.log(id);

    }
    // console.log(popupConfirm);

    if (loading) {
        return <Loader />
    } else {

        return (
            <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100">
                {popupConfirm &&
                    <>
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
                                            Are you sure you want to delete user : {singleUserInfo?.name}
                                        </h3>
                                        <div className="flex justify-center gap-4">
                                            <Button
                                                color="gray"
                                                onClick={() => setPopupConfirm(false)}
                                            >
                                                No, cancel
                                            </Button>

                                            <Button
                                                color="failure"
                                                onClick={() => { deleteConfirm(true), setPopupConfirm(false) }}
                                            >
                                                Yes, Delete Please
                                            </Button>

                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </React.Fragment>
                    </>
                }
                <h2 className="mb-4 text-2xl font-semibold leading-tight">Users</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-xs table-auto">

                        <thead className="dark:bg-gray-700">
                            <tr className="text-left ">
                                <th className="p-3">[]</th>
                                <th className="p-3">ID #</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Password</th>
                                <th className="p-3">Action</th>

                            </tr>
                        </thead>
                        <tbody className=''>
                            {
                                usersData &&
                                usersData?.map(u =>
                                    <UserRow
                                        key={u._id}
                                        u={u}
                                        deleteConfirm={deleteConfirm}
                                        showUserInfo={showUserInfo}
                                        setPopupConfirm={setPopupConfirm}
                                        popupConfirm={popupConfirm}
                                        setSingleUserInfo={setSingleUserInfo}

                                    >
                                    </UserRow>
                                )
                            }

                        </tbody>
                    </table>
                </div>

                <div className='py-10 text-center'>
                    <p>Current Page {currentPage}, Selected {itemsPerPage} </p>
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
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Select an option</label>

                    {/* select how many document want to show */}
                    <select
                        onChange={event => setItemsPerPage(event.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option value={itemsPerPage}>{itemsPerPage}</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>
            </div >
        );
    }
};

export default Users;