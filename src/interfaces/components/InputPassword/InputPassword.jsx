import React, { useState } from 'react';
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/solid"

const InputPassword = ({setValue}) => {
    const [passwordType, setPasswordType] = useState("password");

    const togglePasswordVisibility = () => {
        if (passwordType === "password"){
            setPasswordType("text");
        } else {
            setPasswordType("password");
        }
    }
    const getValue = (event) => {
        setValue(event.target.value)
    }

    return (
        <div className='login-input pl-0 flex justify-between items-center'>
            <input 
                type={passwordType} 
                onChange= {getValue} 
                className='w-full daisy-input daisy-input-bordered ' />
            {
                passwordType==="password" ? 
                <EyeIcon onClick={togglePasswordVisibility} className='h-8 w-8 ml-1 fill-neutral-400' />
                :
                <EyeSlashIcon onClick={togglePasswordVisibility} className='h-8 w-8 ml-1 fill-neutral-400' />
            }
           
        </div>

    );
};

export default InputPassword;