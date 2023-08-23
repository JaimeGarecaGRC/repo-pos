import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css"
import { Login } from "@pages/Login";
import  BaseLayout from "@pages/BaseLayout.jsx";
import Users from "../interfaces/pages/Users";
import Transactions from "../interfaces/pages/Transactions";
import AppContext from "../context/AppContext";
import { AppContextProvider } from "../hooks/appContextProvider";
import LoginGoogleAuth from "../interfaces/pages/LoginGoogleAuth";
import CreateUser from "../interfaces/pages/CreateUser";
import Home from "../interfaces/pages/Home";
import Sectors from "@pages/Sectors";
import Reports from "@pages/Reports";
import CreateSector from "@pages/CreateSector";

const App = () => {
  const initialState = AppContextProvider();
  return(
    <AppContext.Provider value={initialState}>
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={ <BaseLayout/> } >
            <Route path="Users" element= {<Users />} ></Route>
            <Route path="CreateUser" element= {<CreateUser />} />
            <Route path="Transactions" element= {<Transactions />} />
              <Route path="Sectors" element={ <Sectors/>} />
              <Route path="Sectors" element={ <Sectors/>} />
              <Route path="CreateSector" element={<CreateSector />} />
              <Route path="Reports" element={<Reports />} />
            <Route path="home" element ={<Home />} />
          </Route>
          <Route exact path="Login" element={ <Login/> } />
          <Route exact path="LoginAuth" element={ <LoginGoogleAuth /> } />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
};

export default App;



