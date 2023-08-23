import React from 'react';

const ErrorPage = ({title, messages, action, actionMessage}) => {
    return (
        <div className="grid grid-cols-1">
         {/*<div className='w-full bg-primary py-4 px-16 font-semibold grid grid-cols-1 justify-items-center'>*/}
            <h3 className='text-lg font-bold'>{title}</h3>
            {
                messages.map(message=>(
                    <p key={message} className="pt-4">{message}</p>
                ))
            }
            {/*<p className='py-4'>{message}</p>*/}
            <img src="https://i.imgur.com/iUEII79.png" alt="/" className='w-32 justify-self-center' />
            <button className='daisy-btn w-fit justify-self-end' onClick={action}>{actionMessage}</button>
        </div>
    );
};

export default ErrorPage;