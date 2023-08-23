import React from 'react';
import {XIcon} from "@heroicons/react/24/outline";
import ReactDOM from "react-dom";

const Modal = ({show, onClose, children}) => {
    if (!show){
        return null
    }

    return ReactDOM.createPortal(
        <div onClick={onClose} className='fixed left-0 top-0 right-0 bottom-0 z-30 px-6 py-10 bg-base-300/50 flex items-center justify-center'>
            <div onClick={event => event.stopPropagation()} className='daisy-modal-box  max-w-5xl'>
                 {children}
            </div>
        </div>,
        document.getElementById('modal')
    )
};

export default Modal;