import React, {useContext, useState} from 'react';
import AppContext from "../../../context/AppContext";
import {Field, Formik} from "formik";
import * as Yup from "yup";
import "./modify.css"
import postApiData from "../../../api/postApiData";

const ModifySector = ({item, onClose}) => {

   const {updateSectorUrl, setError} = useContext(AppContext);
    const [isModified, setIsModified] = useState(false);

    const handleModify = (values) => {
        postApiData(updateSectorUrl, values, setError).then((response)=> {
            console.log(response)
            if (response?._metadata.status){
                setIsModified(true);
            }
        });
    }
    const validateSchema = Yup.object().shape({
        name: Yup.string()
            .required("El nombre es requerido"),
        description: Yup.string()
            .required("La descripción es requerido"),
        iconLink: Yup.string()
            .url("Debe ingresar un url de una imagen"),
        enabled: Yup.boolean()
    })

    const formatSectorData = () => {
        if (item.enabled === "Si"){
            item.enabled = true;
        } else if (item.enabled === "No") {
            item.enabled = false;
        }
      return item;
    }
    return (
        <div className="flex flex-col items-start">
            {!isModified ?
                <>
                    <h1 className="daisy-card-title">Modificar Datos del Rubro</h1>
                    <div className="daisy-divider"></div>
                    <Formik
                        initialValues={formatSectorData()}
                        onSubmit={(values, errors) =>{
                            handleModify(values,errors)
                        }}
                         validationSchema={validateSchema}
                    >
                        {
                            ({errors, touched, handleSubmit}) => {
                                return (
                                    <form onSubmit={handleSubmit} className="form-one-column-modify">

                                        <div className="form-item-wrapper-modify">
                                            <label>Nombre</label>
                                            <div className="w-full h-full flex flex-col">
                                                <Field name="name" />
                                                <span>{touched.name && errors.name}</span>
                                            </div>
                                        </div>

                                        <div className="form-item-wrapper-modify">
                                            <label>Descripción</label>
                                            <div className="w-full h-full flex flex-col">
                                                <Field name="description" />
                                                <span>{touched.description && errors.description}</span>
                                            </div>
                                        </div>

                                        <div className="form-item-wrapper-modify">
                                            <label>Enlace del Icono</label>
                                            <div className="w-full h-full flex flex-col">
                                                <Field name="iconLink" />
                                                <span>{touched.iconLink && errors.iconLink}</span>
                                            </div>
                                        </div>

                                        {/*TODO HABILITAR ESTA OPCIÓN CUANDO SE CAMBIE EL SERVICIO*/}
                                        {/*<div className="form-toggle-wrapper">*/}
                                        {/*    <label>Habilitado</label>*/}
                                        {/*    <div className="w-full h-full flex flex-col">*/}
                                        {/*        <Field*/}
                                        {/*            name="enabled"*/}
                                        {/*            type="checkbox"*/}
                                        {/*        />*/}
                                        {/*        <span>{touched.enabled && errors.enabled}</span>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}


                                        <div className='mt-8 flex flex-wrap justify-center gap-12'>
                                            <button onClick={onClose} className='button-secondary button-small'>Cancelar</button>
                                            <button type="submit" className='button-primary button-small bg-primary'>Modificar</button>
                                        </div>
                                    </form>
                                )
                            }
                        }
                    </Formik>
                </>
                :
                <>
                    <h1>El rubro ha sido modificado exitosamente</h1>
                </>
            }
         </div>
    );
};

export default ModifySector;