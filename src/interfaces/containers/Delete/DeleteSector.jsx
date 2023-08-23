import React, {useContext, useState} from 'react';
import AppContext from "../../../context/AppContext";
import deleteApiData from "../../../api/deleteApiData";

const DeleteSector = ({item, onClose}) => {
    const {setError, deleteSectorUrl} = useContext(AppContext);
    const [isDisabled, setIsDisabled] = useState(false);
    const [sector, setSector] = useState(item);
    const handleDisable = () => {
        const url = deleteSectorUrl(item.sectorId);
        deleteApiData(url, setError).then((response)=> {
            if (response?._metadata.status){
                setIsDisabled(true);
            }
        })
    }
    return (
        <div className='flex flex-col items-start'>
            {!isDisabled ?
            <>
                <h1 className='text-xl font-semibold'>Desabilitación de Rubro </h1>
                <div className="daisy-divider"></div>
                <h2 className='text-lg'>¿Está seguro que desea desabilitar el rubro seleccionado?</h2>
                <div className='border border-neutral-600 rounded-md self-center my-6 py-4 px-8'>
                    <p>{item.name}</p>
                </div>
                <div className='flex flex-row self-center items-center space-x-10'>
                    <button onClick={onClose} className='button-secondary button-small'>Cancelar</button>
                    <button onClick={handleDisable} className='button-primary button-small daisy-btn-error'>Desabilitar</button>
                </div>
            </>
            :
            <>
                <h1 className='text-xl font-semibold'>El rubro {sector.name} ha sido desabilitado</h1>
            </>
            }
        </div>
    );
};

export default DeleteSector;