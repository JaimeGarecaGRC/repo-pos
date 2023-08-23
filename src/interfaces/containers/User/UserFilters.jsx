import React, {useContext, useEffect, useState} from 'react';
import IconButton from '../../components/IconButton';
import { MagnifyingGlassIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import AppContext from '../../../context/AppContext'
import UserContext from '../../../context/UserContext';
import Select from "react-select";


const UserFilters = ({ setFilters }) => {
    const { styleSelect} = useContext(AppContext)
    const {
        userTypesSelection,
        rolesSelection,
        setRolesSelection,} = useContext(UserContext);

    const [userTypeSelected, setUserTypeSelected] = useState({
        data: userTypesSelection,
        selected: '',
    });
    const [showFilters, setShowFilters] = useState(true);

    const handleSelectUserType = (optionSelected)=> {
        setUserTypeSelected((prevState) => ({
            ...prevState,
            selected: optionSelected? optionSelected.value : "",
        }));
    }

    const handleRol =(option) => {
        setRolesSelection((prevState) => ({
            ...prevState,
            selected: option ? option.value : null,
        }))
    }



    const handleSearch = (event) => {
        event.preventDefault();

        const { inpCI, inpName, inpApPaterno, inpApMaterno } = document.forms[0];
        setFilters({
            ci: inpCI.value,
            lastNameFather: inpApPaterno.value,
            lastNameMother: inpApMaterno.value,
            name: inpName.value,
            roleId: rolesSelection.selected,
            userType: (userTypeSelected ? userTypeSelected.selected : '' ),
            enabled : true,
        });

    }

    const handleClear = (event) => {
        event.preventDefault()
        document.forms[0].reset()
    }

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    }


    return (
        <>
            <div onClick={toggleFilters} className="py-1 mb-1 flex flex-row justify-between items-center cursor-pointer  hover:bg-base-200">
                <h2 className='text-xl font-semibold'>Filtros de búsqueda</h2>
                {showFilters ?
                    <ChevronDownIcon className='icon ' />
                :
                    <ChevronUpIcon className='icon ' />
                }

            </div>

            {showFilters &&
                <form className="w-full flex flex-wrap gap-4 items-center">
                          {/*'w-full grid grid-flow-row-dense auto-cols-max auto-rows-max gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center'>*/}
                    <div className='filter-input-box'>
                        <label >CI</label>
                        <input
                            type="text" placeholder='6342740'
                            name='inpCI' />
                    </div>
                    <div className='filter-input-box'>
                        <label >Nombre</label>
                        <input type="text" placeholder='Sarah' name='inpName' />
                    </div>
                    <div className='filter-input-box'>
                        <label >Apellido Paterno</label>
                        <input type="text" placeholder='Chalup' name='inpApPaterno' />
                    </div>
                    <div className='filter-input-box'>
                        <label >Apellido Materno</label>
                        <input type="text" placeholder='Roca' name='inpApMaterno' />
                    </div>

                    <Select
                        options={userTypesSelection}
                        onChange={handleSelectUserType }
                        defaultValue={null}
                        isClearable={true}
                        placeholder={"Tipo de usuario"}
                        className="filter-select"
                        styles={styleSelect}/>

                    {userTypeSelected.selected === "WEB" &&
                        <Select
                            options={rolesSelection.data}
                            onChange={handleRol }
                            defaultValue={null}
                            isClearable={true}
                            placeholder={"Rol de usuario"}
                            className="filter-select"
                            styles={styleSelect}/>
                    }

                    <IconButton
                        action={handleSearch}
                        Icon={<MagnifyingGlassIcon className='icon' />}
                        text={"Buscar"}
                        style={"daisy-btn-primary"} />
                    <button onClick={handleClear} className="daisy-btn daisy-btn-secondary" >Limpiar campos</button>
                </form>
            }

        </>
    );
};

export default UserFilters;