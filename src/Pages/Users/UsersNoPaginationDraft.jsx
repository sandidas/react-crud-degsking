import { Button, Modal } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/UserContext';
import UserRow from './UserRow';
import { BsExclamationCircle } from "react-icons/bs";
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
    const itemsPerPage = 10;
/*
    useEffect(() => {
        const dataFetchByPagination = async () => {
            const location = `https://server-side-xi.vercel.app/userspagination`;
            try {
                await fetch(location)
                    .then(res => res.json())
                    .then(data => {
                        setUsersData(data.data.users)
                    })
            } catch (error) {
                showAlert('danger', 'Fail to load')
            }
        }
        dataFetchByPagination();
        return

    }, [user?.email])

*/












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

    // search by query
    // const location = `https://server-side-xi.vercel.app/user`;
    // const location = `https://server-side-xi.vercel.app/user?email=${user?.email}`;
    useEffect(() => {
        const dataFetchByQuery = async () => {
            const location = `https://server-side-xi.vercel.app/user?email=${user?.email}`;
            try {
                await fetch(location)
                    .then(res => res.json())
                    .then(data => {
                        setUsersData(data.data)
                    })
            } catch (error) {
                showAlert('danger', 'Fail to load')
            }
        }
        dataFetchByQuery();
        return

    }, [user?.email])






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
        console.log(id);

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
                    <div className="flex justify-center space-x-1 dark:text-gray-100">
                        <button title="previous" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button type="button" title="Page 1" className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-purple-400 dark:border-purple-400">1</button>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 2">2</button>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 3">3</button>
                        <button type="button" className="inline-flex items-center justify-center w-8 h-8 text-sm border rounded shadow-md dark:bg-gray-900 dark:border-gray-800" title="Page 4">4</button>
                        <button title="next" type="button" className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800">
                            <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
            </div >
        );
    }
};

export default Users;