import React, { useState } from 'react';
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";

const DropdownMenu = ({title, listItems, setItemSelected}) => {
    const [listOpen, setListOpen] = useState(false);
    const [headerTitle, setHeaderTitle] = useState( title);
    
    const toggleList = (event) => {
        event.preventDefault();
        setListOpen(!listOpen);
    }
    const selectItem = (item) => {
        setHeaderTitle(item.name);
        setItemSelected(item)
        setListOpen(false);
    }

    return (
        <div className='relative w-full sm:w-56 h-14 border border-neutral-700 my-2 text-md'>
            <button onClick={toggleList} className="w-full h-full px-4 sm:px-1 py-1 flex items-center justify-between">
                {headerTitle}
                {listOpen ?
                    <ChevronUpIcon className='icon'/> :
                    <ChevronDownIcon className='icon'/>
                }
            </button>
            {listOpen && 
            (
                <ul className='absolute w-56 z-10 bg-primary p-0 m-0 border border-neutral-600 pt-2'>
                    {listItems.map((item) => (
                        <li key={item.id} onClick={()=> selectItem(item)} className="px-3 py-1 hover:bg-neutral-200 cursor-pointer">
                            {item.name}
                        </li>
                    ))}
                </ul>
            )
            }
            
        </div>
    );
};

export default DropdownMenu;