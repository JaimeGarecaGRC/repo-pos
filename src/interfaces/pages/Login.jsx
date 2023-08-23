import React, { useContext, useEffect, useState } from 'react';
import logo from "@assets/ServilinkBigLogo.png";
import {Navigate, useNavigate} from "react-router-dom";
import InputPassword from '../components/InputPassword/InputPassword';
import AppContext from '../../context/AppContext';
import postApiData from '../../api/postApiData';
import {useAuth} from "../../context/auth";

const Login = () => {
  const auth = useAuth()

  if (auth.user){
    return <Navigate to="/"/>
  }
  //data necesary for tha API call
  // const {
  //   setLoggedUser,
  //   setIsLoggedIn,
  //   reload,
  //   loginUrl,
  // } = useContext(AppContext);


  //Managing errors
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  //reading input data
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    auth.login(username, password, setError)
  }
 

  useEffect(() => {
    if (error?.response.status === 400) {
      setErrorMessage("Nombre de usuario o contraseña incorrectas")
    }
  }, [error])



  return (
    <div className="login-page-content">

      <div className="daisy-card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
        <div className="daisy-card-body">

          <img src={logo} alt="logo" className='w-52 m-4 self-center' />

          <form onSubmit={handleSubmit} className='flex flex-col '>

            <label className='daisy-label daisy-label-text font-semibold'>Usuario:</label>
            <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)} required className='login-input' />

            <label className='daisy-label daisy-label-text font-semibold'>Contraseña:</label>
            <InputPassword setValue={setPassword} />

            <p className='daisy-label-text-alt text-error'>{errorMessage}</p>
            <button type='submit' className='daisy-btn daisy-btn-primary my-8'>
              Continuar
            </button>

            <a className='daisy-link daisy-link-primary text-center'>¿Olvidó su contraseña?</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export { Login }