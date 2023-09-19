import React  from 'react';
import {EyeIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline"

const TableActions = ({item, handleProfile, handleModify, handleDelete}) => {

    return (
        <div className=' flex flex-row space-x-2 h-6'>
            <EyeIcon onClick={() => handleProfile(item) } className='px-1 stroke-neutral-500 hover:stroke-black cursor-pointer' />
            <PencilSquareIcon onClick={()=> handleModify(item) } className= "px-1 stroke-neutral-500 hover:stroke-black cursor-pointer" />
            <TrashIcon onClick={()=> handleDelete(item) } className='px-1 stroke-neutral-500 hover:stroke-black cursor-pointer' />
        </div>
    );
};

export default TableActions;