import React from "react";
import useReportsValues from "../../hooks/useReportsValues";
import ReportContext from "../../context/ReportsContext";
import IconButton from "@components/IconButton";
import {DocumentIcon,  TableCellsIcon, DocumentChartBarIcon} from "@heroicons/react/24/outline";
import ReportFilters from "../containers/Reports/ReportFilters";

const Reports = () => {
    const reportValues = useReportsValues();
    return (
        <ReportContext.Provider value={reportValues} >
            <div className="page-content">
                <div className='flex flex-col sm:flex-row sm:items-center sm:flex-wrap justify-around sm:justify-between gap-4 mb-2'>
                    <h1 className='page-title'>Reportes Rápidos</h1>
                    <div className='flex flex-col sm:flex-row sm:justify-end sm:gap-6'>
                        <IconButton
                            Icon={<DocumentChartBarIcon className="icon" />}
                            text={"Reportes Detallados"}
                            style={"button-secundary button-medium"}
                        />
                        <IconButton
                            Icon={<DocumentIcon className="icon" />}
                            text={"Generar PDF"}
                            style={"button-secundary button-medium"}
                        />
                        <IconButton
                            Icon={<TableCellsIcon className="icon" />}
                            text={"Generar Excel"}
                            style={"button-secundary button-medium"}
                        />

                    </div>
                </div>
                    <ReportFilters />

            </div>
        </ReportContext.Provider>
    );
}

export default Reports;