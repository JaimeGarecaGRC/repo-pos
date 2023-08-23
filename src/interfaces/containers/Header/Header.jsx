import React, { useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import "./header.css"
import {
    Bars3Icon,
    MagnifyingGlassIcon,
    ChevronDownIcon,
    InformationCircleIcon,
    UserCircleIcon,
    XIcon,
} from "@heroicons/react/24/outline";
import logo from "@assets/ServilinkLogo.png"
import AppContext from '../../../context/AppContext';
import getApiData from "../../../api/getApiData";
import Searchbar from "@components/Searchbar";
import AvatarDropdown from "@components/AvatarDropdown";
import {useAppValues} from "../../../hooks/appContextProvider";

const Header = () => {
    const navigate = useNavigate();


    // const handleLogOut = () => {
    //     //TODO implementar el then() de la promesa
    //     getApiData(logOutUrl, setError)
    //         .then(() =>{
    //             navigate('/login');
    //         } )
    //
    // }

    return (
        <div className='daisy-navbar sticky top-0 z-10 w-full bg-primary text-primary-content'>
            <div className='flex-none'>
                <label htmlFor="my-drawer-2" className="daisy-btn daisy-drawer-button daisy-btn-square daisy-btn-ghost lg:hidden">
                    <Bars3Icon className="inline-block w-5 h-5 stroke-current" />
                </label>
            </div>

            <div className="flex-1">
                <div onClick={()=> navigate('/')} className='hidden md:flex items-center cursor-pointer'>
                    <img src={logo} className="navbar-icon" />
                    <h2 className='font-sans text-lg font-bols'>Servilink</h2>
                </div>
            </div>


            <div className='flex-none gap-2'>
                {/*<Searchbar/>*/}
                <AvatarDropdown />
                {/*<div className="hidden lg:flex">*/}
                {/*    <p onClick={handleLogOut} className="cursor-pointer">Cerrar sesión</p>*/}
                {/*    <ChevronDownIcon className="h-6 mx-2" />*/}
                {/*</div>*/}
                {/*<SearchIcon className="h-8 mx-2 lg:hidden" />*/}
                {/*<UserCircleIcon className="h-8 mx-2 lg:hidden" />*/}
                {/*<InformationCircleIcon className="h-8 mx-2" />*/}
            </div>
        </div>
    );
};

export default Header;