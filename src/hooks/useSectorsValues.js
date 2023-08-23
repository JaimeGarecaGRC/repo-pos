import React, {useState} from 'react';

const UseSectorsValues = () => {
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedSector, setSelectedSector] = useState(null);
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

    const emptySearchSector = {
        name: "",
        description: ""
    }

    const tableColumns = [
        {
            Header: "ID",
            accessor: 'sectorId',
            isIcon: false
        },
        {
            Header: 'Logo',
            accessor: 'iconLink',
            isIcon: true
        },
        {
            Header: 'Nombre',
            accessor: 'name',
            isIcon: false
        },
        {
            Header: 'Descripción',
            accessor: 'description',
            isIcon: false
        },
        {
            Header: 'Habilitado',
            accessor: 'enabled',
            isIcon: false
        },
        {
            Header: 'Cantidad de empresas',
            accessor: 'companies',
            isIcon: false
        },

    ];


    return{
        showModifyModal,
        setShowModifyModal,
        showCreateModal,
        setShowCreateModal,
        showDeleteModal,
        setShowDeleteModal,
        emptySearchSector,
        pageNumber,
        setPageNumber,
        rowsPerPage,
        setRowsPerPage,
        currentPage,
        setCurrentPage,
        sectorsData,
        setSectorsData,
        tableColumns,
        selectedSector,
        setSelectedSector,
    };
};

export default UseSectorsValues;