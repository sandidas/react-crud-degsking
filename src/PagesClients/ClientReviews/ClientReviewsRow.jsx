import React from 'react';
import { AiOutlineDelete } from "react-icons/ai";
import { GrView, GrEdit } from "react-icons/gr";
import { Link } from 'react-router-dom';

const ClientReviewsRow = ({ da, deleteConfirm, showInfo, popupConfirm, setPopupConfirm, setSingleItemInfo, popupHandler }) => {

    const deleteButtonClass = "px-2 py-2 m-1 font-semibold rounded-md shadow border dark:bg-slate-300 dark:text-gray-900 text-lg dark:hover:bg-red-500 dark:hover:text-gray-100 hover:text-gray-100 hover:bg-red-500 dark:border-none";
    const viewButtonClass = "px-2 py-2 m-1 font-semibold rounded-md shadow border dark:bg-slate-300 dark:text-gray-900 text-lg dark:hover:bg-green-500 dark:hover:text-white hover:text-white hover:bg-green-500 dark:border-none";

    return (
        <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900 hover:bg-slate-100">

            <td className="">
                {da?._id} <br />
                <i className='text-gray-400 dark:text-gray-400'>
                    {/* // get current time and data  */}
                    {(new Date(da?.created_at)).toLocaleString()}

                </i>

            </td>
            <td className="">
                {da?.review} 
          
            </td>
            <td className="">
                {da?.rating}*
            </td>
            <td className="">
                {da?.serviceTitle}
            </td>
            <td className="p-1 flex">

                <button onClick={() => { setPopupConfirm(true); setSingleItemInfo(da) }} className={deleteButtonClass}>
                    <span> <AiOutlineDelete /></span>
                </button>



                <button onClick={() => { popupHandler('delete'); setSingleItemInfo(da) }} className={viewButtonClass}>
                    <span> <GrEdit /> </span>
                </button>




            </td>
        </tr>
    );
};

export default ClientReviewsRow;