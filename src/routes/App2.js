import React from 'react';
import {HashRouter, Routes, Route} from "react-router-dom";
import Home from "@pages/Home";
import Users from "@pages/Users";
import Transactions from "@pages/Transactions";
import Sectors from "@pages/Sectors";
import {Login} from "@pages/Login";
import {AuthProvider, AuthRoute, OnlyPublicRoute} from "../context/auth";
import BaseLayout from "@pages/BaseLayout";
import {AppContextProvider} from "../hooks/appContextProvider";
import useUsersValues from "../hooks/useUsersValues";
import CreateUser from "@pages/CreateUser";
import NotFound from "@pages/NotFound";
import CreateSector from "@pages/CreateSector";



const App2 = () => {
   return (
        <>
            <HashRouter>
                <AppContextProvider>
                    <AuthProvider>
                        <BaseLayout>
                            <Routes>
                                <Route path="/" element={
                                    <AuthRoute>
                                        <Home/>
                                    </AuthRoute>} />
                                <Route exact path="/users" element={
                                    <AuthRoute>
                                        <Users />
                                    </AuthRoute>}/>
                                <Route exact path="/users/create" element={
                                    <AuthRoute>
                                        <CreateUser />
                                    </AuthRoute>
                                }/>

                                <Route path="/transactions" element={
                                    <AuthRoute>
                                        <Transactions />
                                    </AuthRoute>}/>

                                <Route path="/sectors" element={
                                    <AuthRoute>
                                        <Sectors />
                                    </AuthRoute>}
                                />
                                <Route exact path="/sectors/create" element={
                                    <AuthRoute>
                                        <CreateSector />
                                    </AuthRoute>
                                }/>

                                <Route path="/login" element={
                                    <OnlyPublicRoute>
                                        <Login/>
                                    </OnlyPublicRoute>
                                }/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </BaseLayout>
                      </AuthProvider>
                </AppContextProvider>


            </HashRouter>
        </>
    );
};

export default App2;