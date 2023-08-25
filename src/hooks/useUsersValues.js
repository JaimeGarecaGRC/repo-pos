import React, { useState } from 'react';

const useUsersValues = () => {
    //modals
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showDropModal, setShowDropModal] = useState(false);

    //variables de los filtros de búsqueda
    const [rolesSelection, setRolesSelection] = useState({
        data: [],
        selected: null,
    });
    const formatRoles = (rawdata) =>
        rawdata.map((data) => ({
            label: data.description,
            value: data.id,
        }))

    //variables de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [usersData, setUsersData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalItems: 0,
    })
    const emptySearchUser = {
        ci: "",
        lastNameFather: "",
        lastNameMother: "",
        name: "",
        userRole: "",
        userType: "",
        enabled : true,
    }
    //columnas de la tabla de usuarios
    const tableColumns = [
        {
            Header: "CI",
            accessor: 'ci',
        },
        {
            Header: 'Nombre Completo',
            accessor: 'fullName',
        },
        {
            Header: 'Correo',
            accessor: 'email',
        },
        {
            Header: 'Último Accesso',
            accessor: 'lastAccess',
        },
        {
            Header: 'Tipo de Usuario',
            accessor: 'userType',
        },
        {
            Header: 'Rol',
            accessor: 'userRole',
        },
    ];

    const userSchema = (user) => {
        return {
            id: user.id,
            name: user.employee.name,
            lastNameFather: user.employee.lastNameFather,
            lastNameMother: user.employee.lastNameMother,
            username: user.username,
            email: user.employee.email,
            ci: user.employee.ci,
            charge: user.employee.position,
            phone: user.employee.phone,
        }
    }

    const formatUser = (users) =>
        users.map((user) => ({
            ci: user.ci,
            fullName: user.fullName,
            email: user.email,
            lastAccess: user.lastAccess,
            userType: user.userType,
        }));


    
    const userTypesSelection = [
        {
            label: "POS",
            value: "POS",
        },
        {
            label: "WEB",
            value: "WEB",
        },
    ];


    return {
        showModifyModal,
        setShowModifyModal,
        userTypesSelection,
        selectedUser,
        setSelectedUser,
        showCreateModal, 
        setShowCreateModal,
        showDropModal, 
        setShowDropModal,
        emptySearchUser,
        pageNumber,
        setPageNumber,
        rowsPerPage,
        setRowsPerPage,
        usersData,
        setUsersData,
        currentPage,
        setCurrentPage,
        tableColumns,
        formatUser,
        rolesSelection,
        setRolesSelection,
        formatRoles,
    };
};

export default useUsersValues;