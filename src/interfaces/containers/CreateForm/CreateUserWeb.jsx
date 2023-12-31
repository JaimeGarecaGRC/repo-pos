import React, { useContext, useState, useEffect } from 'react';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import * as Yup from "yup";
import AutogeneratedFormikField from "../../components/AutogeneratedFormikField"
import Select from 'react-select'
import AppContext from '../../../context/AppContext';
import getApiData from '../../../api/getApiData';
import useUsersValues from "../../../hooks/useUsersValues";
import SelectForm from '../../components/Form/SelectForm';

const CreateUserWeb = ({ handleBack, handleSubmit, rolesSelection, setRolesSelection, userTypeInfo }) => {


    const {  setError, getListRolesUrl, } = useContext(AppContext);
    const userValues = useUsersValues();
    const {
        formatRoles,
    } = userValues;

    useEffect(()=> {
        getApiData(getListRolesUrl, setError).then((response) => {
            //implementación temporal
            if (response._metadata?.status) {
                setRolesSelection(() => ({
                    data: formatRoles(response.data),
                    selected: null,
                }));
            } else {
                setRolesSelection((prevState) => ({
                    ...prevState,
                    data: [],
                }));
            }
        });
    }, []);

    const handleRol =(option) => {
        setRolesSelection((prevState) => ({
            ...prevState,
            selected: option.value,
        }))
    }

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

    return (
        <Formik
            initialValues={{
                name: "",
                lastNameFather: "",
                lastNameMother: "",
                username: "",
                email: "",
                ci: "",
                position: "",
                phone: "",
            }}
            onSubmit={(values, errors) => (
                handleSubmit(values, errors)
            )}
            validationSchema={validateSchema}>
            {
                //propiedades de formik
                ({ errors, touched, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} className="form-one-column">
                            <h1 className='text-2xl font-semibold self-center mb-3'>Usuario Web</h1>

                            {/* <div className="form-item-wrapper">
                                <label>Tipo de Usuario:</label>
                                <div className='w-full h-full flex flex-col'>
                                <Select
                                    options={userTypeInfo.userTypesSelection}
                                    placeholder="Seleccione el tipo de usuario"
                                    className="w-full sm:w-56"
                                    onChange={(optionSelected) => userTypeInfo.setSelectedUserType(optionSelected)}
                                />
                                </div>
                            </div> */}

                            <SelectForm 
                                itemList={userTypeInfo.userTypesSelection}
                                labelName={"Tipo de Usuario:"}
                                stateSetter={userTypeInfo.setSelectedUserType}
                                actualValue={"WEB"}
                            />

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
                                    <AutogeneratedFormikField name="username" />
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

                            <div className="form-item-wrapper">
                                <label>Rol:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Select
                                        options={rolesSelection.data}
                                        className="w-full"
                                        onChange={handleRol} 
                                    />
                                </div>
                            </div>


                            <div className='flex justify-center gap-12'>
                                <button onClick={handleBack} className='button-secondary button-small'>Cancelar</button>
                                <button type='submit' className='button-primary button-small bg-primary'>Crear</button>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    );

};

export default CreateUserWeb;