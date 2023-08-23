import React from 'react';

const IconButton = ({
    action,
    Icon,
    text,
    style,
}) => {
    return (
        <button onClick={action} className= {`${style} daisy-btn daisy-btn-md gap-2`}>
           {Icon}
            {text}
        </button>
    );
};

export default IconButton;

