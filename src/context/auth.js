import React, {useContext, useState} from "react";
import postApiData from "../api/postApiData";
import {Navigate, useNavigate} from "react-router-dom";
import getApiData from "../api/getApiData";
import AppContext from "./AppContext";

//unico contexto global
const AuthContext = React.createContext({});

//todas las funciones para la autenticación
const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState({
        username: "",
        name: "",
        isAuthenticated: false,
    });
    const [fullUserData, setFullUserData] = useState(null);
    const {
        loginUrl,
        logoutUrl,
        authenticatedUserDetailUrl,
        getUserInfoById,
        setError,
    } = useContext(AppContext);
    const navigate = useNavigate();

    const login = (username, password, setError) => {
        setLoading(true);
        //security codes send by backend
        const securityOnlyAccessCode = 'Sesion iniciada';
        const loginAccessCode = 'Google Authenticator';
        const loginInfo = {
            username: username,
            password: password,
        }

        postApiData(loginUrl, loginInfo, setError)
            .then((data) => {
                if (data?.message === loginAccessCode){
                    setIsLoggedIn({
                        username: username,
                        name: data.userFullName,
                        isAuthenticated: false,
                    })

                    navigate('/LoginAuth')

                } else if(data?.message === securityOnlyAccessCode){
                    setIsLoggedIn({
                        username: username,
                        name: data.userFullName,
                        isAuthenticated: true,
                    })
                    setError({});
                    getUserDetails()
                    navigate('/');

                }
            })
        setLoading(false);

    }
    const logout = () => {
        setLoading(true);
        getApiData(logoutUrl, setError)
            .then(() => {
                setIsLoggedIn({
                    username: "",
                    name: "",
                    isAuthenticated: false,
                });
                navigate('/login');
            });
        setLoading(false);
    }

    const getUserDetails = () => {
        setLoading(true);
        //get user based on cockie
        getApiData(authenticatedUserDetailUrl, setError)
            .then(response => {
                if (response != null){
                    setFullUserData(response);

                    setIsLoggedIn((current) => ({
                        ...current,
                        isAuthenticated: true,
                    }));

                    setError({});
                }

                // getApiData(getUserInfoById(fullUserData.userId), setError)
                //     .then(response => {
                //         if (response._metadata?.status === true) {
                //             setFullUserData((current) => ({
                //                 ...current,
                //                 roleId: response.data.roleId,
                //                 userType: response.data.userType,
                //             }))
                //             setIsLoggedIn((current) => ({
                //                 ...current,
                //                 isAuthenticated: true,
                //             }))
                //             console.log(fullUserData)
                //         } else {
                //             setIsLoggedIn((current) => ({
                //                 ...current,
                //                 isAuthenticated: false,
                //             }))
                //         }
                //     });



            })
        setLoading(false);
        //get user based on id

    }


    //comodin para todas las variables de autenticación
    const auth = {
        isLoggedIn,
        fullUserData,
        login,
        logout,
        getUserDetails,
        loading,
    };

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
}

//shortcut for context
function useAuth() {
    return useContext(AuthContext);
}

//define a donde redirigir a los usuarios si es que estan autenticado o no
function AuthRoute({children}) {
    const auth = useAuth();
    if (!auth.loading && !auth.isLoggedIn.isAuthenticated){
        //si ya termino de cargar y no esta autenticado
        return <Navigate to="/login"/>
    }
    return children;
}
function OnlyPublicRoute({children}) {
    const auth = useAuth();
    if (!auth.loading && auth.isLoggedIn.isAuthenticated){
        //si ya termino de cargar y no esta autenticado
        return <Navigate to="/"/>
    }
    return children;
}


export {
    AuthProvider,
    useAuth,
    AuthRoute,
    OnlyPublicRoute,
}