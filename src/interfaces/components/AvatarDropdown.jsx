import React from 'react';
import {UserCircleIcon} from "@heroicons/react/24/outline";
import {useAuth} from "../../context/auth";

const AvatarDropdown = () => {
    const auth = useAuth()
    return (
        <div className="daisy-dropdown daisy-dropdown-end">
            <label tabIndex={0} className="daisy-btn daisy-btn-ghost daisy-btn-circle daisy-avatar ">
                <UserCircleIcon className="w-10" />
            </label>

            <ul tabIndex={0} className="mt-3 p-2 shadow daisy-menu daisy-menu-compact daisy-dropdown-content
            bg-base-100 rounded-box w-52 text-base-content">
                {/*<li>*/}
                {/*    <a>Ver perfil {auth.user?.name}</a>*/}
                {/*</li>*/}
                <li>
                    <a onClick={auth.logout}>Cerrar sesión</a>
                </li>

            </ul>
        </div>
    );
};

export default AvatarDropdown;