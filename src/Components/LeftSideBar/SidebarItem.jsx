import React from 'react';
import { useState } from "react"
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineArrowRight, AiOutlineArrowDown, AiOutlineArrowUp, AiOutlinePlus } from "react-icons/ai";


const SidebarItem = ({ item }) => {
    const [open, setOpen] = useState(false);

    const activeClass = "sidebar-title flex justify-between py-4 px-6 cursor-pointer  dark:bg-black";
    const inActiveClass = "sidebar-title flex justify-between py-4 px-6 cursor-pointer hover:bg-black hover:text-white";
    if (item.childrens) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item cursor-pointer text-gray-900 dark:text-white"}>
                <div className={open ? activeClass : inActiveClass} onClick={() => setOpen(!open)}>

                    <div className='flex items-center gap-1'>
                        {/* {item.icon && <i className={item.icon}></i>} */}
                        <AiOutlinePlus />   {item.title}
                    </div>
                    {open ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}

                </div>
                <div className="sidebar-content  dark:bg-black">
                    {item.childrens.map((child, index) => <SidebarItem key={index} item={child} />)}
                </div>
            </div>
        )
    } else {
        return (
            <NavLink to={item.path || "/"} className={({ isActive }) => (isActive ?
                "sidebar-item plain cursor-pointer py-4 px-10 text-gray-900 dark:text-white flex items-center gap-1 bg-fuchsia-900"
                :
                "sidebar-item plain cursor-pointer py-4 px-10 text-gray-900 dark:text-white flex items-center gap-1 hover:bg-fuchsia-900 hover:text-white")}>
                {/* {item.icon && <i className={item.icon}></i>} */}
                <AiOutlineArrowRight />  {item.title}
            </NavLink>
        )
    }
}



export default SidebarItem;