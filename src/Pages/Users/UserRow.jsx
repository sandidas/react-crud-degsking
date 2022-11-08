import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { GrView, GrEdit } from "react-icons/gr";
import { Link } from 'react-router-dom';

const UserRow = ({ u, deleteConfirm, showUserInfo, popupConfirm, setPopupConfirm, setSingleUserInfo }) => {

    const deleteButtonClass = "px-2 py-2 m-1 font-semibold rounded-md shadow border dark:bg-slate-300 dark:text-gray-900 text-lg dark:hover:bg-red-500 dark:hover:text-gray-100 hover:text-gray-100 hover:bg-red-500 dark:border-none";
    const viewButtonClass = "px-2 py-2 m-1 font-semibold rounded-md shadow border dark:bg-slate-300 dark:text-gray-900 text-lg dark:hover:bg-green-500 dark:hover:text-white hover:text-white hover:bg-green-500 dark:border-none";

    return (
        <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900 hover:bg-slate-100">
            <td className="">
                <input className='w-4 h-4 rounded-md text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' type="checkbox" name="userId" id="" />
            </td>
            <td className="">
                {u?._id}
            </td>
            <td className="">
                {u?.name}
            </td>
            <td className="p-1">
                {u?.email}
            </td>
            <td className="">
                {u?.password}
            </td>
            <td className="p-1 flex">
                <button onClick={() => {setPopupConfirm(true); setSingleUserInfo(u) }} className={deleteButtonClass}>
                    <span> <AiOutlineDelete /></span>
                </button>
                <button onClick={() => showUserInfo(u?._id)} className={viewButtonClass}>
                    <span> <GrView /> </span>
                </button>
                <Link to={`/users/edt/${u?._id}`}  className={viewButtonClass}>
                    <span> <GrEdit /> </span>
                </Link>
            </td>
        </tr>
    );
};

export default UserRow;