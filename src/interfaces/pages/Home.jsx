import React, {useEffect} from 'react';
import FastAccessButtons from '../containers/FastAccessButtons/FastAccessButtons';
import AmountsSummary from '../containers/Summarries/AmountSummary/AmountSummary';
import {useAuth} from "../../context/auth";
import {useAppValues} from "../../hooks/appContextProvider";

const Home = () => {

    return (
        <div className='page-content'>
            <div>
                <h1 className='page-title my-4'>Tablero</h1>
                <div className="flex flex-col lg:flex-row items-center">
                    <AmountsSummary />

                </div>
                <FastAccessButtons />
            </div>
        </div>
    );
};

export default Home;