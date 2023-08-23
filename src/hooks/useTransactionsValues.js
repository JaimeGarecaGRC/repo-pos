import React, { useState } from 'react';

const useTransationsValues = () => {
    //variables de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [transactionsData, setTransactionsData] = useState({
        rowData: [],
        isLoading: false,
        totalPages: 0,
        totalItems: 0,
    })
    const emptyTransaction = {

    }
    const periodSelection = [
        {
            label: "Día",
            value: "day",
        },
        {
            label: "Mes",
            value: "month",
        },
        {
            label: "Rango de Fecha",
            value: "range",
        }
    ];

    const paymentMethodSelection = [
        {
            value: 0,
            label: "Tarjeta",
        },
        {
            value: 1,
            label: "QR",
        }
    ]
    const serviceCompaniesSelection = [
        {
            value: 0,
            label: "CRE",
        },
        {
            value: 1,
            label: "Tigo",
        }
    ]

    const tableColumns = [
        {
            Header: "Fecha",
            accessor: "date",
        },
        {
            Header: "Nro. referencia",
            accessor: "referenceNumber",
        },
        {
            Header: "Rubro",
            accessor: "sectorName",
        },
        {
            Header: "Empresa",
            accessor: "serviceCompanyName",
        },
        {
            Header: "Tipo de servicio",
            accessor: "serviceType",
        },
        {
            Header: "Monto",
            accessor: "amountWithCurrency",
        },
        {
            Header: "Método de pago",
            accessor: "paymentMethod",
        },
        {
            Header: "Usuario",
            accessor: "userFullName",
        },
    ];
    const formatSector = (rawData) => {
        let result = [
            {
                value: null,
                label: "Todos los rubros"
            }
        ];
        rawData.forEach((item) => {
            result.push({
                value: item.sectorId,
                label: item.name,
            });
        });
       return result;
    }
    const formatCompany = (rawData) => {
        let result = [
            {
                value: null,
                label: "Todas las empresas"
            }
        ];
        rawData.forEach((data) => {
            result.push({
                value: data.serviceCompanyId,
                label: data.acronym,
            });
        });

        return result;
    }
    const formatServiceType = (rawData) => {
        let result = [
            {
                value: null,
                label: "Todos los servicios"
            }
        ];
        rawData.forEach((data) => {
            result.push({
                value: data.serviceTypeId,
                label: data.name,
            });
        });

        return result;
    }




    return {
        emptyTransaction,
        periodSelection,
        serviceCompaniesSelection,
        paymentMethodSelection,
        pageNumber,
        setPageNumber,
        rowsPerPage,
        setRowsPerPage,
        transactionsData,
        setTransactionsData,
        tableColumns,
        formatSector,
        formatCompany,
        currentPage,
        setCurrentPage,
        formatServiceType,
    };
};

export default useTransationsValues;