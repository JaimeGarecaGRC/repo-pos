import React, {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import Header from '../containers/Header/Header';
import Sidebar from '../containers/Sidebar/Sidebar';
import ErrorPage from './ErrorPage';
import Modal from '../containers/Modal/Modal'
import {useAuth} from "../../context/auth";
import {useAppValues} from "../../hooks/appContextProvider";
import AppContext from "../../context/AppContext";

const BaseLayout = ({children}) => {
    const auth = useAuth();
    const {
        error,
       errorManager,
        showModal,
        setShowModal,
        setError,
    } = useContext(AppContext);

    const navigate = useNavigate();

    function errorAction () {
        if (error.response?.status === 401){
            setError({});
            auth.logout();
        } else {
            return errorManager.errorAction();
        }
    }

    useEffect(() => {
        if (!auth.loading){
            if (error.response?.status != null){
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        } else {
            setShowModal(false);
        }
    },[error]);

    useEffect (() => {
        auth.getUserDetails()
    },[]);

    if (!auth.loading && auth.isLoggedIn.isAuthenticated){
        return (
            <>
                <div className="daisy-drawer daisy-drawer-mobile">
                    <input id="my-drawer-2" type="checkbox" className="daisy-drawer-toggle" />
                    <div className="daisy-drawer-content">
                        <Header />
                        {children}
                    </div>
                    <Sidebar />
                    {error &&
                        <Modal
                            show={showModal}
                            onClose = {errorAction}>
                            <ErrorPage
                                title={errorManager.errorTitle}
                                messages={errorManager.errorMessages}
                                action={errorAction}
                                actionMessage={errorManager.actionMessage} />
                        </Modal>
                    }
                </div>
            </>

        );
    } else if (!auth.loading) return (
        <>
            {children}
        </>
    )
};

export default BaseLayout;