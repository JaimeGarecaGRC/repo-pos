import { stringify } from 'postcss';
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from "yup"
import AppContext from '../../../context/AppContext';
import getApiData from '../../../api/getApiData';
import { data } from 'autoprefixer';
import AutogeneratedFormikField from '../../components/AutogeneratedFormikField';
import UserContext from '../../../context/UserContext';
import postApiData from '../../../api/postApiData';

const ModifyUser = ({item, onClose}) => {
    //variables para la conexión con la api
    const { updateUserUrl, getUserInfoById, setError, reload} = useContext(AppContext);



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

    //validaciones del formulario
    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .required("El nombre es requerido"),
        lastNameFather: Yup.string()
            .required("El apellido es requerido"),
        lastNameMother: Yup.string()
            .required("El apellido es requerido"),
        ci: Yup.string()
            .required("El carnet de identidad es requerido"),
        email: Yup.string()
            .email("Por favor ingrese un correo válido")
            .required("El correo es requerido"),
        phone: Yup.string()
            .required("El telefono es requerido"),
        position: Yup.string()
            .required("El cargo es requerido"),
    });

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

    //convirtiendo el esquema plano de usuario al esquema de la BD
    const formatUserToDBSchema = (values) => {
        return {
            id: values.id,
            employee: {
                id: values.employeeId,
                ci: values.ci,
                name: values.name,
                lastNameFather: values.lastNameFather,
                lastNameMother: values.lastNameMother,
                email: values.email,
                phone: values.phone,
                position: values.position,
            },
            userType: values.userType,
            username: values.username,
            roleId: values.roleId,
            businessId: values.businessId,
            branchId: values.branchId,
        }
    }

    const handleSubmit = (values, errors) => {
        const user = formatUserToDBSchema(values)
        postApiData(updateUserUrl, user, setError)
        .then((response) => {
            if (response?._metadata.status){
                reload()
            }
        })
    }


    return (
        <div>
            <h1 className='text-xl font-semibold'>Modificar Datos del Usuario </h1>
            <hr className='my-6 stroke-neutral-600'/>
            <Formik
                enableReinitialize={true}
                initialValues={userData}
                onSubmit={(values, errors) => handleSubmit(values, errors)}
                validationSchema = {validateSchema}
            >
                {
                    ({
                        errors,
                        handleSubmit,   
                        touched,
                    }) => {
                        return(
                            <form onSubmit={handleSubmit} className="form-one-column">
                                <div className="form-item-wrapper">
                                <label>Nombre:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="name" />
                                    <span>{touched.name && errors.name}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Apellido Paterno:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="lastNameFather" />
                                    <span>{touched.lastNameFather && errors.lastNameFather}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Apellido Materno:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="lastNameMother" />
                                    <span>{touched.lastNameMother && errors.lastNameMother}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Nombre de usuario:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <AutogeneratedFormikField name="username"  />
                                    <span>{touched.username && errors.username}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>CI:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="ci" />
                                    <span>{touched.ci && errors.ci}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Correo:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="email" />
                                    <span>{touched.email && errors.email}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Telefono:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="phone" />
                                    <span>{touched.phone && errors.phone}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Cargo:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="position" />
                                    <span>{touched.position && errors.position}</span>
                                </div>
                            </div>

                            <div className='flex justify-center gap-12'>
                                <button onClick={onClose} className='button-secondary button-small'>Cancelar</button>
                                <button className='button-primary button-small'>Modificar</button>
                            </div>
                            </form>
                        )
                    }
                }
            </Formik>
               
        </div>
    );
};

export default ModifyUser;