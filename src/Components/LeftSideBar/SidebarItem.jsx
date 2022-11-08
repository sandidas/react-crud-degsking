import React from 'react';
import { useState } from "react"
import { Link } from 'react-router-dom';


const SidebarItem = ({ item }) => {
    const [open, setOpen] = useState(false);

    if (item.childrens) {
        return (
            <div className={open ? "sidebar-item open" : "sidebar-item cursor-pointer text-gray-900 dark:text-white"}>
                <div className="sidebar-title flex justify-between py-3 px-6" onClick={() => setOpen(!open)}>
                    <div className=''>
                        {/* {item.icon && <i className={item.icon}></i>} */}
                        {item.title}
                    </div>
                    <i className="bi-chevron-down toggle-btn"> + </i>
                </div>
                <div className="sidebar-content">
                    {item.childrens.map((child, index) => <SidebarItem key={index} item={child} />)}
                </div>
            </div>
        )
    } else {
        return (
            <Link to={item.path || "/"} className="sidebar-item plain cursor-pointer block py-2 px-10 text-gray-900 dark:text-white">
                {/* {item.icon && <i className={item.icon}></i>} */}
                {item.title}
            </Link>
        )
    }
}

export default SidebarItem;