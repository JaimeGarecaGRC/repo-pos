import React, {useContext, useState} from 'react';
import useSectorValues from "../../hooks/useSectorValues";
import {useNavigate} from "react-router-dom";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import AppContext from "../../context/AppContext";
import postApiData from "../../api/postApiData";
import Modal from "../containers/Modal/Modal";

const CreateSector = () => {
    const {createSectorUrl, setError} = useContext(AppContext)
    const sectorValues = useSectorValues();
    const navigate = useNavigate();
    const [sectorName, setSectorName] = useState("");

    let newSector;

    const handleSubmit = (values, {setFieldError, resetForm}) => {
        newSector = formatSectorData(values);
        postApiData(createSectorUrl, newSector, setError).then((response) => {

            if(response?._metadata.status){
                sectorValues.setShowCreateModal(true);
                setSectorName(newSector.name)
                resetForm({ values: "" })
                console.log("submtied");
            }
        })

    }

    const formatSectorData = (values) => {
        return {
            name: values.name,
            description: values.description,
            iconLink: values.iconLink,
        }
    }

    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .required("El nombre es requerido"),
        description: Yup.string()
            .required("La descripción es requerido"),
        iconLink: Yup.string()
            .url("Debe ingresar un url de una imagen"),
        enabled: Yup.string(),
    })

    const handleBack = (event) => {
        event.preventDefault();
        navigate(-1)
    }

    const handleBackSector = () => {
        navigate("/sectors")
    }

    const [toggle, setToggle] = useState(true);
    const handleToggle = () => {setToggle(!toggle)}

    return (
       <>
           <div className='page-content flex flex-col items-center'>
                <div className="text-sm self-start daisy-breadcrumbs">
                    <ul>
                        <li onClick={handleBackSector}><a>Rubros</a></li>
                        <li>Crear rubro</li>
                    </ul>
                </div>
               <h1 className='page-title mb-8 '>Crear Rubro</h1>

               <Formik
                   initialValues={{
                   name: "",
                   description: "",
                   iconLink: "",
                   enabled: "",
               }}
                   onSubmit={(values, errors) => (
                       handleSubmit(values, errors)
                   )}
                   validationSchema={validateSchema}>
                   {
                       ({errors, touched, handleSubmit}) => {
                           return (
                               <form onSubmit={handleSubmit} className="form-one-column">

                                   <div className="form-item-wrapper">
                                       <label>Nombre</label>
                                       <div className="w-full h-full flex flex-col">
                                           <Field name="name" />
                                           <span>{touched.name && errors.name}</span>
                                       </div>
                                   </div>

                                   <div className="form-item-wrapper">
                                       <label>Descripción</label>
                                       <div className="w-full h-full flex flex-col">
                                           <Field name="description" />
                                           <span>{touched.description && errors.description}</span>
                                       </div>
                                   </div>

                                   <div className="form-item-wrapper">
                                       <label>Enlace del Icono</label>
                                       <div className="w-full h-full flex flex-col">
                                           <Field name="iconLink" />
                                           <span>{touched.iconLink && errors.iconLink}</span>
                                       </div>
                                   </div>

                                   <div className="form-item-wrapper">
                                       {/*<label>Habilitado</label>*/}
                                       <div className="w-full h-full flex flex-col">

                                           <span>{touched.enabled && errors.enabled}</span>
                                       </div>
                                   </div>

                                   <div className='mt-8 flex flex-wrap justify-center gap-12'>
                                       <button onClick={handleBack} className='button-secondary button-small'>Cancelar</button>
                                       <button type="submit" className='button-primary button-small bg-primary'>Crear</button>
                                   </div>
                               </form>
                           )
                       }
                   }
               </Formik>

               <Modal
                   show={sectorValues.showCreateModal}
                   onClose={() => sectorValues.setShowCreateModal(false)}>
                   <div className="flex flex-col items-center">
                       <h1>Nuevo rubro {sectorName} creado con éxito</h1>
                   </div>
               </Modal>
           </div>
       </>
    );
};

export default CreateSector;