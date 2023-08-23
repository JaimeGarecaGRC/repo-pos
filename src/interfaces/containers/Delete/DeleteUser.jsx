import React, { useContext } from 'react';
import deleteApiData from '../../../api/deleteApiData';
import AppContext from "../../../context/AppContext"

const   DeleteUser = ({item, onClose}) => {
    const { setError, reload, deleteUserUrl,} = useContext(AppContext);
    const dropUser = () => {

        //delete endpoint http://localhost:9000/api/users/delete/12
        const url = deleteUserUrl( item.id);
        deleteApiData(url, setError)
        .then((data) => {
            if (data?._metadata.status){
                console.log("El usuario fue eliminado con exito");
                reload();
            } 
        })
    }

    return (
        <div className='flex flex-col items-start'>
            <h1 className='text-xl font-semibold'>Eliminación de Usuario </h1>
            <div className="daisy-divider"></div>
            <h2 className='text-lg'>¿Está seguro que desea eliminar al usuario seleccionado? Una vez eliminado no podrá recuperar estos datos</h2>
            <div className='border border-neutral-600 rounded-md self-center my-6 py-4 px-8'>
                <p>{item.fullName}</p>
            </div>
            <div className='flex flex-row self-center items-center space-x-10'>
            <button onClick={onClose} className='button-secondary button-small'>Cancelar</button>
            <button onClick={dropUser} className='button-primary button-small daisy-btn-error'>Eliminar</button>
            </div>
        </div>
    );
};

export default DeleteUser;