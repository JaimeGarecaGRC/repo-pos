import React, { useContext, useEffect, useState } from 'react';
import IconButton from '../components/IconButton';
import { DocumentIcon, TableCellsIcon } from "@heroicons/react/24/outline"
import TransactionContext from "../../context/TransactionContext";
import useTransationsValues from '../../hooks/useTransactionsValues';
import TransactionFilters from '../containers/Transaction/TransactionFilters';
import TransactionTable from '../containers/Transaction/TransactionTable';
import AppContext from '../../context/AppContext';
import postApiData from '../../api/postApiData';



const Transactions = () => {

    const transactionValues = useTransationsValues();
    const {setError, searchTransactionUrl, } = useContext(AppContext);
    const [filters, setFilters] = useState({});

    useEffect(()=> {
        transactionValues.setCurrentPage(1);
    },[filters]);

    useEffect(() => {
        transactionValues.setTransactionsData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        const url = searchTransactionUrl(transactionValues.currentPage, transactionValues.rowsPerPage)
        //size es la cantidad de registros mostrados por página
        //page es cada una de las páginas que se desea mostrar cada vez
        postApiData(url, filters, setError).then((response)=> {
            if (response?._metadata.status){
                transactionValues.setTransactionsData({
                    isLoading: false,
                    rowData: response.data,
                    totalPages: response._metadata.pagination.total_pages,
                    totalItems: response._metadata.pagination.total_count,
                });
            } else {
                transactionValues.setTransactionsData({
                    isLoading: false,
                    rowData: [],
                    totalPages: 0,
                    totalItems: 0,
                });
            }
            
        });
    }, [transactionValues.currentPage, transactionValues.rowsPerPage, filters])

    return (
        <TransactionContext.Provider value={transactionValues}>
            <div className='page-content'>
                <div className="page-title-wrapper">
                    <h1 className='page-title'>Transacciones</h1>
                    <div className='flex flex-col sm:flex-row sm:justify-end sm:gap-2 mt-2'>
                        <IconButton
                            Icon={<DocumentIcon className="icon" />}
                            text={"Generar PDF"}
                            style={"daisy-btn-secondary"}
                        />
                        <IconButton
                            Icon={<TableCellsIcon className="icon" />}
                            text={"Generar Excel"}
                            style={"daisy-btn-secondary"}
                        />
                    </div>
                </div>
                    <TransactionFilters setFilters = {setFilters}/>

                    <TransactionTable />

                
            </div>
        </TransactionContext.Provider>
    );
};

export default Transactions;