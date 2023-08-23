import React, { useContext, useEffect, useState } from 'react';
import postApiData from '../../../api/postApiData';
import TransactionContext from '../../../context/TransactionContext';
import { getData, columns, formatRowData } from '../../../hooks/transactionData';
import Pagination from '../../components/Table/Pagination';
import MyTable from '@components/Table/MyTable';
import AppContext from '../../../context/AppContext'


const TransactionTable = () => {
 
  const {
    transactionsData, 
    tableColumns,
    setRowsPerPage,
    currentPage,
    setCurrentPage,} = useContext(TransactionContext);
 
  const pageNumberLimit = 10;
  const [maxPageLimit, setMaxPageLimit] = useState(pageNumberLimit);
  const [minPageLimit, setMinPageLimit] = useState(0);


  return (
    <div className="my-4">
      <div className='flex flex-row flex-wrap w-full justify-between items-center gap-2'>
      <Pagination
          totalRows={transactionsData.totalItems}
          currentPage = {currentPage}
          setCurrentPage = {setCurrentPage}
          setRowsPerPage = {setRowsPerPage}
          totalPages={transactionsData.totalPages}
          pageNumberLimit = { pageNumberLimit}
          maxPageLimit = { maxPageLimit}
          setMaxPageLimit = { setMaxPageLimit}
          minPageLimit = { minPageLimit}
          setMinPageLimit = { setMinPageLimit}
          />
           <p>Total de elementos: {transactionsData.totalItems.toString() || "Cargando..."}</p>
      </div>

      <MyTable
        data={transactionsData.rowData} 
        columns={tableColumns}
        isLoading={transactionsData.isLoading} />

        <div className='flex flex-row flex-wrap w-full justify-between items-center gap-2'>
      <Pagination
          totalRows={transactionsData.totalItems}
          currentPage = {currentPage}
          setCurrentPage = {setCurrentPage}
          setRowsPerPage = {setRowsPerPage}
          totalPages={transactionsData.totalPages}
          pageNumberLimit = { pageNumberLimit}
          maxPageLimit = { maxPageLimit}
          setMaxPageLimit = { setMaxPageLimit}
          minPageLimit = { minPageLimit}
          setMinPageLimit = { setMinPageLimit}
          />
           <p>Total de elementos: {transactionsData.totalItems.toString() || "Cargando..."}</p>
      </div>
    </div>
   
  );
};

export default TransactionTable;