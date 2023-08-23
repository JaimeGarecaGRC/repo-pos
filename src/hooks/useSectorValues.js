import React, {useState} from 'react';

const UseSectorValues = () => {
    //modales
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    //variables de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [sectorsData, setSectorsData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalItems: 0,
    })
    const tableColumns = [
        {
            Header: "ID",
            accessor: 'id',
        },
        {
            Header: 'Nombre',
            accessor: 'name',
        },
        {
            Header: 'Descripción',
            accessor: 'description',
        },
        {
            Header: 'Cantidad de empresas',
            accessor: 'companies',
        },
    ];


    return{
        showModifyModal,
        setShowModifyModal,
        showCreateModal,
        setShowCreateModal,
        pageNumber,
        setPageNumber,
        rowsPerPage,
        setRowsPerPage,
        currentPage,
        setCurrentPage,
        sectorsData,
        setSectorsData,
        tableColumns,

    };
};

export default UseSectorValues;