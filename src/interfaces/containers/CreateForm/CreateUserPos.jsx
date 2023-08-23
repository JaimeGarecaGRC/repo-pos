import React, {useContext, useEffect} from 'react';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import * as Yup from "yup";
import AutogeneratedFormikField from "../../components/AutogeneratedFormikField"
import getApiData from "../../../api/getApiData";
import AppContext from "../../../context/AppContext";

const CreateUserPos = ({ handleBack, handleSubmit, rolesSelection, setRolesSelection  }) => {

    const {
        setError,
        getPOSRoleUrl,} = useContext(AppContext);
    useEffect(()=> {
        getApiData( getPOSRoleUrl,setError).then((response) =>{
            if(response._metadata.status){
                setRolesSelection((prevState) => ({
                    ...prevState,
                    selected: response.data.id,
                }));
            }
        })

    }, []);


    // const {
    //     values: {username},
    //     touched,
    //     setFieldError,
    // } = useFormikContext();

    // //Consulta a la base de datos
    // async function validateUsername(username) {
    //     const getUserURL = baseUrl + "users/exists?username=" + username
    //     const data = await getApiData(getUserURL, setError);
    //     if (data?.message == "Existe") {
    //         console.log("el usuario existe");
    //         return false;
    //     } else if (data?.message == "No existe") {
    //         return true;
    //     }
    //     else {
    //         return null;
    //     }
    // }

    // useEffect(() => {
    //     if (username !== '' && touched.username){
    //         (async () => {
    //             const isUsernameAvailable = await validateUsername(username);
    //             if (isUsernameAvailable != null){
    //                 if (!isUsernameAvailable){
    //                     setFieldError("username", "El nombre de usuario ya existe")
    //                 }
    //             }
    //         })();
    //     }
    // })


    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .required("El nombre es requerido"),
        lastNameFather: Yup.string()
            .required("El apellido es requerido"),
        lastNameMother: Yup.string()
            .required("El apellido es requerido"),
        username: Yup.string()
            .required("El nombre de usuario es requerido")
            .matches(/^[0-9]+$/, "El nombre de usuario debe ser numérico")
            .min(8, 'Debe tener exáctamente 8 caracteres')
            .max(8, 'Debe tener exáctametne 8 caracteres'),
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
                ({  errors, touched, handleSubmit }) => {
                    return (
                        <Form onSubmit={handleSubmit} className="form-one-column">
                            <h1 className='text-2xl font-semibold self-center mb-3'>Usuario Pos</h1>
                            <div className="form-item-wrapper">
                                <label>Nombre:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="name" />
                                    <span className="text-error">{touched.name && errors.name}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Apellido Paterno:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="lastNameFather" />
                                    <span className="text-error">{touched.lastNameFather && errors.lastNameFather}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Apellido Materno:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="lastNameMother" />
                                    <span className="text-error">{touched.lastNameMother && errors.lastNameMother}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Nombre de usuario:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="username" />
                                    <span className="text-error">{touched.username && errors.username}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>CI:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="ci" />
                                    <span className="text-error">{touched.ci && errors.ci}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Correo:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="email" />
                                    <span className="text-error">{touched.email && errors.email}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Telefono:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="phone" />
                                    <span className="text-error">{touched.phone && errors.phone}</span>
                                </div>
                            </div>

                            <div className="form-item-wrapper">
                                <label>Cargo:</label>
                                <div className='w-full h-full flex flex-col'>
                                    <Field name="position" />
                                    <span className="text-error">{touched.position && errors.position}</span>
                                </div>
                            </div>

                            <div className='flex justify-center gap-12'>
                                <button onClick={handleBack} className='button-secondary button-small'>Cancelar</button>
                                <button type="submit" className='button-primary button-small bg-primary'>Crear</button>
                            </div>
                        </Form>
                    )
                }
            }
        </Formik>
    );

};

export default CreateUserPos;