import React, { useContext, useEffect, useState } from "react";
import TransactionContext from "../../../context/TransactionContext";
import DropdownMenu from "../../components/DropdownMenu"
import DatePicker from "react-date-picker";
import IconButton from "../../components/IconButton";
import {ChevronDownIcon, ChevronUpIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import Select from 'react-select'
import AppContext from "../../../context/AppContext";
import getApiData from "../../../api/getApiData"
import postApiData from "../../../api/postApiData";

const TransactionFilters = ({setFilters}) => {
    //variables para los filtros
    const {
        setError,
        styleSelect,
        getAllSectorsUrl,
        getCompaniesBySectorIdUrl,
        getAllCompaniesUrl,
        getServicesTypesByCompanyIdUrl
    } = useContext(AppContext);
    const {
        periodSelection,
        paymentMethodSelection,
        formatSector,
        formatCompany,
        formatServiceType, } = useContext(TransactionContext);
    const [showFilters, setShowFilters] = useState(true);
    const [periodSelected, setPeriodSelected] = useState(null);
    const [sectorSelected, setSectorSelected] = useState({
        data: [],
        selected: null,
    });
    const [companiesSelected, setCompaniesSelected] = useState({
        data: [],
        selected: null,
    });
    const [serviceTypeSelected, setServiceTypeSelected] = useState({
        data: [],
        selected: null,
    });
    const [paymentMethodSelected, setPaymentMethodSelected] = useState(null)
    const [date, setDate] = useState(new Date());

    //Preparando los filtros
    useEffect(()=> {

        getApiData(getAllSectorsUrl, setError).then((response) => {
            if (response != null){
                setSectorSelected({
                    data: formatSector(response),
                    selected: null,
                }) 
            }
        })
    }, [])

    //preparando los filtros de empresa de servicio según el rubro
    useEffect(()=> {
        //serviceCompanies/search/sector/4

        if (sectorSelected?.selected?.value != null){
           const urlCompany = getCompaniesBySectorIdUrl(sectorSelected.selected.value);
            getApiData(urlCompany, setError).then((response) => {
                if (response?._metadata.status) {
                    setCompaniesSelected({
                        data: formatCompany(response.data),
                        selected: null
                    })
                } else {
                    setCompaniesSelected({
                        data: [],
                        selected: null
                    })
                }
            })
        } else {
            //TODO implementación provicional ya que no cumple con el estandar de siemrpe

            getApiData(getAllCompaniesUrl, setError).then((response) => {
                if (response!= null) {
                    setCompaniesSelected({
                        data: formatCompany(response),
                        selected: null
                    })
                }
            })
        }
    }, [sectorSelected.selected])

    //preparando los filtros de tipo de servicio según la empresa
    useEffect(()=> {
        ///serviceTypes/search/serviceCompany/2
        if (companiesSelected.selected?.value != null){
            const url = getServicesTypesByCompanyIdUrl( companiesSelected.selected.value);
            getApiData(url, setError).then((response) => {
                if (response?._metadata.status) {
                    setServiceTypeSelected({
                        data: formatServiceType(response.data),
                        selected: null
                    })
                } else {
                    setServiceTypeSelected({
                        data: [],
                        selected: null
                    })
                }
            })
        } else {
            setServiceTypeSelected({
                data: [],
                selected: null
            })
        }

    }, [companiesSelected.selected])

    useEffect(()=> {
        console.log(companiesSelected)
    }, [companiesSelected])
 

    const handleSelectedPeriod = (optionSelected) => {
        setPeriodSelected(optionSelected?.value);
    }
    const handleSlectedSector = (optionSelected) => {
        setSectorSelected((prevState) => ({
            ...prevState,
            selected: optionSelected ? optionSelected : null,
        }))
    }
    const handleSelectedCompany = (optionSelected) => {
        setCompaniesSelected((prevState) => ({
            ...prevState,
            selected: optionSelected ? optionSelected : null,
        }))
    }
    const handleSelectedServiceType = (optionSelected) => {
        setServiceTypeSelected((prevState) => ({
            ...prevState,
            selected: optionSelected ? optionSelected : null,
        }))
    }
    const handleSelectedPayment = (optionSelected) => {
        setPaymentMethodSelected(optionSelected?.value)
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const {inpNRef} = document.forms[0];
        setFilters( {
            reference: inpNRef.value,
            serviceCompanyId: companiesSelected.selected ? companiesSelected.selected.value : null,
            sectorId: sectorSelected.selected ? sectorSelected.selected.value : null,
            serviceTypeId: serviceTypeSelected.selected ? serviceTypeSelected.selected.value : null,
            userId: null,
        })
        // ///transactions/search?page=1&size=5
        // setTransactionsData((prevState) => ({
        //     ...prevState,
        //     rowData: [],
        //     isLoading: true,
        // }));
        // const url = baseUrl + "transactions/search?page=" + currentPage + "&size=" + rowsPerPage;
        // postApiData(url, filters, setError).then((response) => {
        //     if(response?._metadata.status){
        //         setTransactionsData({
        //             isLoading: false,
        //             rowData: response.data,
        //             totalPages: response._metadata.pagination.total_pages,
        //             totalItems: response._metadata.pagination.total_count,
        //         });
        //     }
        //     else {
        //         console.log(response?._metadata.message);
        //     }
        // })
    }

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    }

    return (
        <div>
            <div onClick={toggleFilters} className="py-1 mb-1 flex flex-row justify-between items-center cursor-pointer  hover:bg-base-200">
                <h2 className='text-xl font-semibold'>Filtros de búsqueda</h2>
                {showFilters ?
                    <ChevronDownIcon className='icon ' />
                    :
                    <ChevronUpIcon className='icon ' />
                }

            </div>
            {showFilters &&
                <form
                    className='w-full flex flex-wrap gap-4'>
                    {/*grid grid-flow-row auto-cols-max auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-start items-center'>*/}
                    <div className="flex flex-col">
                        <label className="filter-label"> Nº transacción </label>
                        <input type="text" placeholder='1234567' name='inpNRef'
                               className="filter-input"/>
                    </div>

                    <div className="flex flex-col">
                        <label className="filter-label">Periodo</label>
                        <Select options={periodSelection}
                                onChange={handleSelectedPeriod}
                                defaultValue={null}
                                isClearable={true}
                                className="filter-select "
                                placeholder="Seleccione un periodo"
                                styles={styleSelect}
                        />
                    </div>



                    {
                        periodSelected === "day" &&
                        <div className="flex flex-col">
                            <label className="filter-label">Día</label>
                            <DatePicker onChange={setDate} value={date}
                                        className="filter-date-picker"/>
                        </div>

                    }
                    {
                        periodSelected === "month" &&
                        <div className="flex flex-col">
                            <label className="filter-label">Mes</label>
                            <DatePicker onChange={setDate} value={date}
                                        className="filter-date-picker "/>
                        </div>

                    }
                    {
                        periodSelected === "range" &&
                        <>
                            <div className="flex flex-col">
                                <label className="filter-label">Inicio</label>
                                <DatePicker onChange={setDate} value={date}
                                            className="filter-date-picker "/>
                            </div>
                            <div className="flex flex-col">
                                <label className="filter-label">Fin</label>
                                <DatePicker onChange={setDate} value={date}
                                            className="filter-date-picker "/>
                            </div>
                            {/*<DatePicker onChange={setDate} value={date}*/}
                            {/*            className="filter-date-picker md:row-start-3 md:col-span-2 lg:row-start-auto"/>*/}
                            {/*<DatePicker onChange={setDate} value={date}*/}
                            {/*            className="filter-date-picker md:row-start-3 md:col-span-2 lg:row-start-auto"/>*/}
                        </>
                    }

                    <div className="flex flex-col">
                        <label className="filter-label ">Rubro</label>
                        <Select
                            options={sectorSelected.data}
                            onChange={handleSlectedSector}
                            defaultValue={null}
                            isClearable={true}
                            className="filter-select "
                            placeholder="Seleccione un rubro"
                            styles={styleSelect}/>
                    </div>

                    <div className="flex flex-col">
                        <label className="filter-label ">Empresa</label>
                        <Select
                            options={companiesSelected.data}
                            onChange={handleSelectedCompany}
                            defaultValue={null}
                            value={companiesSelected.selected}
                            isClearable={true}
                            className="filter-select"
                            placeholder="Seleccione una empresa"
                            styles={styleSelect}/>
                    </div>


                    {
                        companiesSelected.selected &&
                        <>
                            <div className="flex flex-col">
                                <label className="filter-label">Servicios</label>
                                <Select
                                    options={serviceTypeSelected.data}
                                    onChange={handleSelectedServiceType}
                                    defaultValue={null}
                                    value={serviceTypeSelected.selected}
                                    isClearable={true}
                                    className="filter-select"
                                    placeholder="Seleccione un servicio de la empresa"
                                    styles={styleSelect}
                                />
                            </div>


                        </>

                    }

                    <div className="flex flex-col">
                        <label className="filter-label">Usuario</label>
                        <Select options={paymentMethodSelection}
                                defaultValue={null}
                                isClearable={true}
                                className="filter-select"
                                placeholder="Seleccione un usuario"
                                styles={styleSelect}/>
                    </div>

                    <IconButton
                        action={handleSearch}
                        Icon={<MagnifyingGlassIcon className="icon"/>}
                        text={"Buscar"}
                        style={"daisy-btn-primary self-end"}
                    />

                </form>
            }
        </div>
    );
};

export default TransactionFilters;