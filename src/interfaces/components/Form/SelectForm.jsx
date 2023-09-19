import React, { useEffect, useState } from 'react';

function SelectForm({itemList, labelName, stateSetter, actualValue }) {

    const handleSelectChange = (selectedOption) => {
        stateSetter(selectedOption);
    };

    return(
        <div className="form-item-wrapper mt-2 mb-2">
            <label>{labelName}</label>
            <div className='w-full h-full flex flex-col'>
                <select className="border rounded-lg border-gray-400 h-9" value={actualValue} onChange={(event) => handleSelectChange({label: event.target.value, value: event.target.value})}>
                    {itemList.map( ( item, index ) => {
                        return(
                            <option key={index} value={item.value}>{item.label}</option>    
                        )
                    })}
                </select>
            </div>
        </div>
    )
}

export default SelectForm;