import React, {useState} from 'react';
import IconButton from "@components/IconButton";
import {ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const SectorFilters = ({setFilters}) => {

    const [showFilters, setShowFilters] = useState(true);
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    }
    const handleClear = () => {
        document.forms[0].reset()
    }
    const handleSearch = (event) => {
        event.preventDefault();

        const {inpName, inpDescription} = document.forms[0];
        setFilters({
            name: inpName.value,
            description: inpDescription.value,
        });
    }
    return (
        <>
            <div onClick={toggleFilters} className="p-2 m-2 rounded-md  flex flex-row justify-between items-center cursor-pointer  hover:bg-base-200">
                <h2 className='text-xl font-semibold'>Filtros de búsqueda</h2>
                {showFilters ?
                    <ChevronUpIcon className='icon ' />
                    :
                    <ChevronDownIcon className='icon ' />
                }
            </div>
            {showFilters &&
                <form className="w-full flex flex-wrap gap-4 items-center">
                    <div className='filter-input-box'>
                        <label> Nombre </label>
                        <input
                            type="text" placeholder='Ej. Luz'
                            name='inpName' />
                    </div>
                    <div className='filter-input-box'>
                        <label> Descripcion </label>
                        <input type="text" placeholder='Servicio' name='inpDescription' />
                    </div>

                    <IconButton
                        action={handleSearch}
                        Icon={<MagnifyingGlassIcon className="icon"/> }
                        text={"Buscar"}
                        style={"daisy-btn-primary"}/>
                    <button onClick={handleClear} className="daisy-btn daisy-btn-secondary" >Limpiar campos</button>
                </form>
            }

            {/*<div className="daisy-collapse daisy-collapse-arrow border rounded-md hover:bg-base-200 peer-checked:hover:bg-base-100">*/}
            {/*    <input type="checkbox"  />*/}
            {/*    <div className="daisy-collapse-title text-xl">*/}
            {/*        Filtros de búsqueda*/}
            {/*    </div>*/}
            {/*    <div className="daisy-collapse-content">*/}
            {/*        <form className="w-full flex flex-wrap gap-4 items-center">*/}
            {/*            <div className='filter-input-box'>*/}
            {/*                <label >CI</label>*/}
            {/*                <input*/}
            {/*                    type="text" placeholder='6342740'*/}
            {/*                    name='inpCI' />*/}
            {/*            </div>*/}
            {/*            <div className='filter-input-box'>*/}
            {/*                <label >Nombre</label>*/}
            {/*                <input type="text" placeholder='Sarah' name='inpName' />*/}
            {/*            </div>*/}

            {/*            <IconButton*/}
            {/*                Icon={<SearchIcon className="icon"/> }*/}
            {/*                text={"Buscar"}*/}
            {/*                style={"daisy-btn-primary"}/>*/}
            {/*            <button onClick={handleClear} className="daisy-btn daisy-btn-secondary" >Limpiar campos</button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default SectorFilters;