import React, {useContext, useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import InputPassword from '../components/InputPassword/InputPassword';
import AppContext from '../../context/AppContext';
import postApiData from '../../api/postApiData';

const LoginGoogleAuth = () => {
    const navigate = useNavigate();
   
    //login logic
    const {
      loggedUser,
      setIsLoggedIn,
      reload,
        loginCodeUrl,
    } = useContext(AppContext);

    const successCode = "Sesión iniciada";

    //managing errors
    const [error, setError]= useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    //reading input data
    const [inpToken, setInpToken] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      const loginInfo = {
        username: loggedUser.username,
        code: inpToken
      }
      postApiData(loginCodeUrl, loginInfo, setError)
      .then((data) => {
        if (data?.message === successCode){
      
          navigate('/home');
          reload()
          setIsLoggedIn(true);
        }
      })
    }

   useEffect(() => {
    if (error?.response.status === 400){
      setErrorMessage( "Código incorrecto")
    }
  },[error])

  //in case of refresh
  useEffect(() => {
    if(loggedUser===null){
      navigate('/Login')
    }
  },[])

    return (
        <div className="login-page-content">
        <div className='daisy-card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100'>
            <div className="daisy-card-body">
                <h1 className="font-sans text-2xl font-semibold text-center mb-6">
                    {`Hola, ${loggedUser?.name}`}
                </h1>
                <h2 className='font-sans text-md text-center'>
                    Por favor ingrese su código del Autenticador de Google
                </h2>
                <img src='https://i.imgur.com/VFaBTq3.png' alt='Google Autenticator' className='h-28 my-4 place-self-center ' />

                <form className='flex flex-col'>

                    <label className='text-lg text-gray-800 '>Código</label>
                    <InputPassword setValue = {setInpToken} />
                    <p className='text-red-600 texl-lg'>{errorMessage}</p>

                    <button type='submit' onClick={handleSubmit} className='button-primary bg-secundary my-6'>Iniciar Sesión</button>

                    <a className='daisy-link text-center'>
                        ¿Cómo obtener su autenticador de Google?
                    </a>
                    <a onClick={()=> navigate('/Login')} className='daisy-link text-center'>
                        Cambiar de cuenta
                    </a>
                </form>
            </div>
        </div>
      </div>
    );
};

export default LoginGoogleAuth;