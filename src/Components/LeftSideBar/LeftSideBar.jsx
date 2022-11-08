import React, { useState } from 'react';
import items from "../../Data/sidebar.json"
import SidebarItem from './SidebarItem';

const LeftSideBar = () => {
    const [showsidebarchild, setShowsidebarchild] = useState(false);
    const sidebarChildToggler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setShowsidebarchild(!showsidebarchild);
    }

    return (
        <div className="sidebar" >
            {items.map((item, index) => <SidebarItem key={index} item={item} />)}
        </div>
    );
};

export default LeftSideBar;