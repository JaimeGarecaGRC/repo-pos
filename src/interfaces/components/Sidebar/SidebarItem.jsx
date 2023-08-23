import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom"
import "./sidebar-item.css"
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const SidebarItem = ({ name, Icon, route, options }) => {

    return (
        <li>
            <NavLink
                to={route}
                end
                className={ ({isActive}) => {
                    if(isActive)
                        return ("daisy-active")
                }}>
                {Icon}
                {name}
            </NavLink>
        </li>

    );
};

export default SidebarItem;

{/*<div className='sidebar-single-item' onClick={handleClick}>*/}
{/*    <div className='flex flex-row items-center'>*/}
{/*        {Icon}*/}
{/*        <p className='sidebar-item-name'>{name}</p>*/}
{/*    </div>*/}
{/*    /!* <ChevronUpIcon className='icon' /> *!/*/}
{/*</div>*/}
