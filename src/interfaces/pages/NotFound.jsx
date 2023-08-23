import React from 'react';
import {useNavigate} from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const backHome = () => {
        navigate("/");
    }
    return (
        <div className="grid w-full min-h-screen bg-accent items-center place-items-center place-content-center">
            <h1 className="text-7xl font-semibold">Página no Encontrada</h1>
            <h2 className="text-3xl font-semibold pt-4 pb-10">Lo sentimos,la página que busca no ha sido encontrada</h2>
            <button onClick={backHome} className="daisy-btn w-fit">Volver al menú principal</button>
        </div>
    );
};

export default NotFound;