
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import AppContext from '../../context/AppContext';
import Modal from "../containers/Modal/Modal";
import useUsersValues from '../../hooks/useUsersValues';
import postApiData from '../../api/postApiData';
import CreateUserWeb from '../containers/CreateForm/CreateUserWeb';
import CreateUserPos from '../containers/CreateForm/CreateUserPos';
import Select from 'react-select';
import {useAppValues} from "../../hooks/appContextProvider";
import {useAuth} from "../../context/auth";

const CreateUser = () => {
    const userValues = useUsersValues();
    const {
        userTypesSelection,
        rolesSelection,
        setRolesSelection,
    } = userValues;
    const navigate = useNavigate();
    const [selectedUserType, setSelectedUserType] = useState(userTypesSelection[0]);

    //data necesary for post
    const {
        setError,
        createUserUrl,
        createEmployeeUrl,
        loggedUserData,
        setLoggedUserData } = useAppValues();

    const auth = useAuth();

    const [response, setResponse] = useState(null);

    let newUser = null;
    let employeeId = null;




    const handleSubmit = (values, { setFieldError, resetForm }) => {
        console.log("submtied");
        //Crear un empleado
        const employee = formatEmployee(values);
        //registrar al empleado
        postApiData(createEmployeeUrl, employee, setError)
            .then((response) => {
                if (response?._metadata.status) {
                    employeeId = response.data.id
                    newUser = formatUserToDBSchema(values, employeeId);
                    console.log(newUser);
                    postApiData(createUserUrl, newUser, setError)
                        .then((response) => {
                            if (response?._metadata.status) {
                                console.log(response);
                                //recibe los datos del usuario creado
                                userValues.setShowCreateModal(true);
                                resetForm({ values: "" })
                            }
                            else {
                                setResponse(response);
                                userValues.setShowCreateModal(true);
                            }
                        })
                }
            })
        //   
        // setTimeout(() => {
        //     setFieldError("email", "This email is already taken")
        // }, 1000)
    }

    const formatEmployee = (values) => {
        return {
            ci: values.ci,
            name: values.name,
            lastNameFather: values.lastNameFather,
            lastNameMother: values.lastNameMother,
            email: values.email,
            phone: values.phone,
            position: values.position,
        }
    }

    const formatUserToDBSchema = (values, employeeId) => {
        return {
            employeeId: employeeId,
            userType: selectedUserType.value,
            username: values.username,
            roleId: rolesSelection.selected,
            businessId: auth.fullUserData.business.id,
            branchId: auth.fullUserData.branch.branchId,
        }
    }

   
    const handleBack = (event) => {
        event.preventDefault();
        navigate(-1)
    }

    return (
        <>

            <div className='page-content flex flex-col items-center'>
                <div className='w-full flex flex-col md:flex-row justify-between'>
                    <h1 className='page-title mb-8 '>Crear Usuario</h1>
                    <Select
                        options={userTypesSelection}
                        placeholder="Seleccione el tipo de usuario"
                        className="w-full sm:w-56"
                        onChange={(optionSelected) => setSelectedUserType(optionSelected)}
                    />
                </div>

                {
                    selectedUserType?.value === "WEB" &&
                    <CreateUserWeb
                        handleBack={handleBack}
                        handleSubmit={handleSubmit}
                        rolesSelection={rolesSelection}
                        setRolesSelection={setRolesSelection} />
                }
                {
                    selectedUserType?.value === "POS" &&
                    <CreateUserPos
                        handleBack={handleBack}
                        handleSubmit={handleSubmit}
                        rolesSelection={rolesSelection}
                        setRolesSelection={setRolesSelection} />
                }

                <Modal
                    show={userValues.showCreateModal}
                    onClose={() => userValues.setShowCreateModal(false)}   >
                    <div className='flex flex-col items-center'>
                        {
                            response ?
                                response.message.map((message) => (
                                    <h1>{message}</h1>
                                ))
                                : <h1>{"Usuario creado con éxito"}</h1>
                        }
                        {/*<h1 className='text-2xl'>{*/}
                        {/*    response ?*/}
                        {/*        response.message*/}
                        {/*        : "Usuario creado con éxito"}*/}
                        {/*</h1>*/}
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default CreateUser;