import React, {useState} from 'react';

const UseBusinessValue = () => {
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedBusiness, setSelectedBusiness] = useState(null);
    //variables de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [businessData, setBusinessData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalItems: 0,
    })

    const emptySearchBusiness = {
        name: "",
        description: ""
    }

    const tableColumns = [
        {
            Header: "ID",
            accessor: 'businessId',
            isIcon: false
        },
        {
            Header: 'Direccion Central',
            accessor: 'central_direction',
            isIcon: false
        },
        {
            Header: 'Nombre',
            accessor: 'name',
            isIcon: false
        },
        {
            Header: 'Telefono',
            accessor: 'phone',
            isIcon: false
        }
    ];


    return {
        showModifyModal,
        setShowModifyModal,
        showCreateModal,
        setShowCreateModal,
        showDeleteModal,
        setShowDeleteModal,
        selectedBusiness,
        setSelectedBusiness,
        currentPage,
        setCurrentPage,
        pageNumber,
        setPageNumber,
        rowsPerPage,
        setRowsPerPage,
        businessData,
        setBusinessData,
        tableColumns,
        emptySearchBusiness,
    };
};

export default UseBusinessValue;