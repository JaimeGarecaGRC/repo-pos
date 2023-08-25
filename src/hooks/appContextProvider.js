import React, {useContext, useState} from "react";
import AppContext from "../context/AppContext";

const AppContextProvider = ({children}) => {

    const baseUrl =  "http://localhost:9000/api/";
    // const baseUrl = "http://servilinkapi.aquinot.com/api/";
    //LOGIN
    const authenticatedUserDetailUrl = baseUrl + "auth/details";
    const loginUrl = baseUrl + "auth/login";
    const loginCodeUrl = baseUrl + "auth/verify";
    const logoutUrl = baseUrl + "auth/logout";
    //ROLES
    const getAllRolesUrl = baseUrl + "roles/all";
    const getListRolesUrl = baseUrl +  "roles/list";
    const getPOSRoleUrl = baseUrl +  "roles/pos";
    //EMPLOYEE
    const createEmployeeUrl = baseUrl + "employees/save";
    //USERS
    const existUserByUsernameUrl = (username) => {return  baseUrl + "users/exists?username=" + username};
    const searchUserUrl = (page, size) => { return  baseUrl + "users/search?page=" + page + "&size=" + size}
    const createUserUrl = baseUrl + "users/save";
    const updateUserUrl = baseUrl +  "users/update";
    const getUserInfoById = (id) => {return baseUrl +  "users/info/" + id }
    const deleteUserUrl = (userId) => {return baseUrl + "users/delete/" + userId}
    //TRANSACTION
    const searchTransactionUrl = (page, size) => { return  baseUrl + "transactions/search?page=" + page + "&size=" + size}
    //SECTOR
    const getAllSectorsUrl = baseUrl + "sectors/all";
    const createSectorUrl = baseUrl + "sectors/save";
    const deleteSectorUrl = (sectorId) => {return baseUrl + "sectors/delete/" + sectorId}
    const updateSectorUrl = baseUrl + "sectors/update";
    const searchSectorUrl = (page, size) => { return  baseUrl + "sectors/search?page=" + page + "&size=" + size}

    //COMPANIES
    const getCompaniesBySectorIdUrl = (sectorId) => {return baseUrl + "serviceCompanies/search/sector/" + sectorId}
    const getAllCompaniesUrl =  baseUrl + "serviceCompanies/all";
    //SERVICE TYPE
    const getServicesTypesByCompanyIdUrl = (companyId) => {return baseUrl + "serviceTypes/search/serviceCompany/" + companyId }


    //   const baseUrl = "https://jessat18.herokuapp.com/api/";
    const [showSidebar, setShowSidebar] = useState(true);
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserData, setLoggedUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const reload = () => {
        window.location.reload();
    }


    //Error logic
    const [error, setError] = useState({});
    let errorManager = {
        errorTitle: "",
        errorMessages: [],
        actionMessage: "",
        errorAction: ()=> {
            console.log("This is doing something")}
    }
    if (error.response?.status != null){
        switch (error.response?.status) {
            case 0:
                //if there is no status
                if (error.message === 'Network Error'){
                    errorManager.errorTitle = "Ocurrió un error de conexión";
                    errorManager.errorMessages.push( "Asegúrese de que se encuentra conectado a la red");
                    errorManager.actionMessage ="Actualizar";
                    errorManager.errorAction = ()=> {
                        setError({})
                        reload();
                    }
                }

                break;

            case 400:
                errorManager.errorTitle = "No se ha podido completar la acción";
                if (error.response.data?._metadata != null){
                    error.response.data._metadata.messages.map((message) => {
                        errorManager.errorMessages.push(message)
                    })
                } else {
                    errorManager.errorMessages.push("Revise los campos ingresados");
                }
                errorManager.actionMessage = "Volver a intentar";
                errorManager.errorAction = ()=> {
                    setError({})
                    setShowModal(false);
                }
                break;
            case 401:
                errorManager.errorTitle = "El tiempo de la sesión ha expirado";
                errorManager.errorMessages.push("Debe volver a autenticarse");
                errorManager.actionMessage = "Iniciar sesión";

                //errorAction navigate to login
                break;
            case 404:
                errorManager.errorTitle = "Ha ocurrido un error";
                errorManager.errorMessages.push("Vuelva a intentarlo en unos momentos más");
                errorManager.actionMessage = "Aceptar";
                errorManager.errorAction = ()=> {
                    setError({})
                    reload()
                }
                break;

            default:
                errorManager.errorTitle = "Ha ocurrido un error";
                errorManager.errorMessages.push( "Vuelva a intentarlo en unos momentos más");
                errorManager.actionMessage = "Aceptar";
                errorManager.errorAction = ()=> {
                    setError({})
                    reload()
                }
                break;
        }
    }

    


    const styleSelect = {
        control: (base, state )=> ({
            ...base,
            border: "1px solid rgb(115, 115, 115)",
            // This line disable the blue border
            boxShadow: 'none'
        })
    };
    //useful data
    const appValues = {
        showSidebar,
        setShowSidebar,
        error,
        setError,
        errorManager,
        loggedUser,
        setLoggedUser,
        reload,
        baseUrl,
        isLogguedIn: isLoggedIn,
        setIsLoggedIn,
        showModal,
        setShowModal,
        loggedUserData,
        setLoggedUserData,
        styleSelect,
        authenticatedUserDetailUrl,
        loginUrl,
        loginCodeUrl,
        createUserUrl,
        createEmployeeUrl,
        getAllRolesUrl,
        getListRolesUrl,
        existUserByUsernameUrl,
        getPOSRoleUrl,
        searchUserUrl,
        updateUserUrl,
        getUserInfoById,
        searchTransactionUrl,
        getAllSectorsUrl,
        createSectorUrl,
        deleteSectorUrl,
        searchSectorUrl,
        updateSectorUrl,
        getCompaniesBySectorIdUrl,
        getAllCompaniesUrl,
        getServicesTypesByCompanyIdUrl,
        deleteUserUrl,
        logoutUrl,
    };
    
    return(
        <AppContext.Provider value={appValues}>
            {children}
        </AppContext.Provider>
    );
}

function useAppValues() {
    return useContext(AppContext);
}

export {AppContextProvider, useAppValues};