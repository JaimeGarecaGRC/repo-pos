import { stringify } from 'postcss';
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import AppContext from '../../../context/AppContext';
import getApiData from '../../../api/getApiData';

const ProfileUser = ({item, onClose}) => {
    //variables para la conexión con la api
    const {  getUserInfoById, setError } = useContext(AppContext);


    const initialValues = {
        id: "",
        ci: "",
        name: "",
        lastNameFather: "",
        lastNameMother: "",
        username: "",
        email: "",
        position: "",
        phone: "",
        userRole: "",
        userType: "",
        enabled : true,
    }

 //Encontrar datos del usuario seleccionado
    const [userData, setUserData] = useState(initialValues);

    useEffect(() => {
        const findUserUrl = getUserInfoById(item.id)
        getApiData(findUserUrl, setError)
        .then((response) => {
            if (response?._metadata.status) {
                setUserData( fromDBSchemaToUser(response.data));
            } 
        })
    }, [])

    //convirtiendo el esquema de la bd a uno más plano para el formulario
    const fromDBSchemaToUser = (userDB) => {
        return ({
            id: userDB.id,
            employeeId: userDB.employee.id,
            name: userDB.employee.name,
            lastNameFather: userDB.employee.lastNameFather,
            lastNameMother: userDB.employee.lastNameMother,
            username: userDB.username,
            email: userDB.employee.email,
            ci: userDB.employee.ci,
            position: userDB.employee.position,
            phone: userDB.employee.phone,
            userType: userDB.userType,
            roleId: userDB.roleId,
            businessId: userDB.businessId,
            branchId: userDB.branchId,
        })
    }

    return (
        <div>
            <h1 className='text-xl font-semibold'>Ver Datos del Usuario </h1>
            <hr className='my-6 stroke-neutral-600'/>
            <div className="profile-container ml-10">
                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">Nombre:</label>
                    <span className="text-gray-800">{userData.name}</span>
                </div>

                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">Apellido Paterno:</label>
                    <span className="text-gray-800">{userData.lastNameFather}</span>
                </div>

                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">Apellido Materno:</label>
                    <span className="text-gray-800">{userData.lastNameMother}</span>
                </div>

                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">Nombre de usuario:</label>
                    <span className="text-gray-800">{userData.username}</span>
                </div>

                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">CI:</label>
                    <span className="text-gray-800">{userData.ci}</span>
                </div>

                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">Correo:</label>
                    <span className="text-gray-800">{userData.email}</span>
                </div>

                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">Telefono:</label>
                    <span className="text-gray-800">{userData.phone}</span>
                </div>

                <div className="profile-item flex items-center mb-4">
                    <label className="font-semibold text-lg mr-2">Cargo:</label>
                    <span className="text-gray-800">{userData.position}</span>
                </div>
                </div>
            <button onClick={onClose} className='button-secondary button-small ml-10'>
                Cerrar
            </button>
        </div>

    );
};

export default ProfileUser;