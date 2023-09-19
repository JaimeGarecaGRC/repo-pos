import React, { useContext } from 'react';
import "./sidebar.css"
import { 
    HomeIcon, 
    CogIcon,
    UserIcon,
    DocumentIcon,
    ArrowsRightLeftIcon,
    RectangleStackIcon, 
    BuildingOffice2Icon,
    BuildingStorefrontIcon,
    CurrencyDollarIcon} from "@heroicons/react/24/solid";
import SidebarItem from '../../components/Sidebar/SidebarItem';
import {useAuth} from "../../../context/auth";

const Sidebar = () => {
    const auth = useAuth()

    const sidebarItems = [
        {
            name: "Inicio",
            icon: <HomeIcon className='sidebar-item-icon' />,
            route: "/"
        },
        {
            name: "Usuarios",
            icon: <UserIcon className='sidebar-item-icon' />,
            route: "/users"
        },
        {
            name: "Transacciones",
            icon: <ArrowsRightLeftIcon className='sidebar-item-icon' />,
            route: "/transactions"
        },
        {
            name: "Reportes",
            icon: <DocumentIcon className='sidebar-item-icon' />,
            route: "reports"
        },
        {
            name: "Rubros",
            icon: <RectangleStackIcon className='sidebar-item-icon' />,
            route: "/sectors"
        },
        {
            name: "Sucursales",
            icon: <BuildingOffice2Icon  className='sidebar-item-icon' />,
            route: "/branch"
        },
        {
            name: "Comercios",
            icon: <BuildingStorefrontIcon className='sidebar-item-icon' />,
            route: "/business"
        },
        {
            name: "Servicios",
            icon: <CurrencyDollarIcon  className='sidebar-item-icon' />,
            route: "/services"
        },
        // {
        //     name: "Configuraciones",
        //     icon: <CogIcon className='sidebar-item-icon' />,
        //     route: "/"
        // },
    ]
    return (
        <div className="daisy-drawer-side">
            <label htmlFor="my-drawer-2" className="daisy-drawer-overlay"></label>
            <ul className="daisy-menu p-2 w-64 bg-base-200 text-base-content ">
                <h1 className='sidebar-title text-xl mt-8'>
                    {auth.fullUserData ? auth.fullUserData.business.name : "Comercio"}
                </h1>
                <h2 className='sidebar-title text-lg mb-6 mt-1'>
                    {auth.fullUserData ? auth.fullUserData.branch.name : "Sucursal"}
                </h2>
                {
                    sidebarItems.map( item => (
                        <SidebarItem
                            name= {item.name}
                            Icon = {item.icon}
                            route = {item.route}
                            options = {item.options? item.options : []}
                            key = {item.name} />
                    ))
                }
            </ul>
        </div>
        // <div className={showSidebar ? "sidebar": "hidden"}>
        //     <h1 className='sidebar-title text-2xl mt-8'>
        //         {loggedUserData ? loggedUserData.business.name : "Comercio"}
        //     </h1>
        //     <h2 className='sidebar-title text-lg mb-6 mt-1'>
        //         {loggedUserData ? loggedUserData.branch.name : "Sucursal"}
        //     </h2>
        //     <div className='flex flex-col space-y-4'>
        //         {
        //             sidebarItems.map( item => (
        //                 <SidebarItem
        //                     name= {item.name}
        //                     Icon = {item.icon}
        //                     route = {item.route}
        //                     options = {item.options? item.options : []}
        //                     key = {item.name} />
        //
        //             ))
        //         }
        //     </div>
        // </div>
    );
};

export default Sidebar;