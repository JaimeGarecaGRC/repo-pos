import React, {useContext, useState} from "react";
import AppContext from "../../../context/AppContext";
import {ChevronDownIcon, ChevronUpIcon} from "@heroicons/react/24/outline";
import {BuildingOfficeIcon} from '@heroicons/react/24/solid'
import Select from "react-select";
import DatePicker from "react-date-picker";
import ReportsContext from "../../../context/ReportsContext";
import IconButton from "@components/IconButton";

const ReportFilters = ({setFilters}) => {
    const {baseUrl, setError, styleSelect} = useContext(AppContext);
    const {periodSelection} = useContext(ReportsContext);
    const [showFilters, setShowFilters] = useState(true);

    const [periodSelected, setPeriodSelected] = useState(null);
    const [date, setDate] = useState(new Date());

    const handleSelectedPeriod = (optionSelected) => {
        setPeriodSelected(optionSelected?.value);
    }

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    }

    return (
        <div>
            <div onClick={toggleFilters} className="py-1 mb-1 flex flex-row justify-between items-center cursor-pointer  hover:bg-neutral-100">
                <h2 className='text-xl font-semibold'>Filtros de búsqueda</h2>
                {showFilters ?
                    <ChevronDownIcon className='icon ' />
                    :
                    <ChevronUpIcon className='icon ' />
                }
            </div>
            {showFilters &&
                <form    className='w-full grid grid-flow-row auto-cols-max auto-rows-max grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 justify-start items-center'>
                    <label className="filter-label col-start-1">Periodo</label>
                    <Select options={periodSelection}
                            onChange={handleSelectedPeriod}
                            defaultValue={null}
                            isClearable={true}
                            className="filter-select "
                            placeholder="Seleccione un periodo"
                            styles={styleSelect}
                    />

                    {
                        periodSelected === "day" &&
                        <DatePicker onChange={setDate} value={date}
                                    className="filter-date-picker  md:col-span-2 lg:row-start-auto"/>
                    }
                    {
                        periodSelected === "month" &&
                        <DatePicker onChange={setDate} value={date}
                                    className="filter-date-picker md:col-span-2 lg:row-start-auto"/>
                    }
                    {
                        periodSelected === "range" &&
                        <>
                            <DatePicker onChange={setDate} value={date}
                                        className="filter-date-picker md:row-start-3 md:col-span-2 lg:row-start-auto"/>
                            <DatePicker onChange={setDate} value={date}
                                        className="filter-date-picker md:row-start-3 md:col-span-2 lg:row-start-auto"/>
                        </>
                    }
                    <IconButton
                        text={"Monto por empresa"}
                        Icon={<BuildingOfficeIcon className="icon" /> }
                        style={"button-secundary button-medium col-start-1"}
                    />
                    <IconButton
                        text={"Monto por empresa"}
                        Icon={<BuildingOfficeIcon className="icon" />}
                        style={"button-secundary button-medium"}
                    />
                    <IconButton
                        text={"Monto por empresa"}
                        Icon={<BuildingOfficeIcon className="icon" /> }
                        style={"button-secundary button-medium"}
                    />
                </form>
            }
        </div>
    )
}

export default ReportFilters;