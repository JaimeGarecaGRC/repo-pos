import React, {useContext, useState} from 'react';
import SectorContext from "../../../context/SectorContext";
import Pagination from "@components/Table/Pagination";
import MyTable from "@components/Table/MyTable";
import MyIconTable from "@components/Table/MyIconTable";

const SectorTable = () => {
    const {
        sectorsData,
        setRowsPerPage,
        currentPage,
        setCurrentPage,
        tableColumns,

        setShowModifyModal,
        setSelectedSector,
        setShowDeleteModal,
    } = useContext(SectorContext)

    const pageNumberLimit = 10;
    const [maxPageLimit, setMaxPageLimit] = useState(pageNumberLimit);
    const [minPageLimit, setMinPageLimit] = useState(0);

    const handleModify = (sector) => {
        setSelectedSector(sector);
        setShowModifyModal(true);
    }
    const handleDelete = (sector) => {
        setSelectedSector(sector);
        setShowDeleteModal(true);
    }
    const formatSectorData = (sectorData) => {
        return sectorData.map((sector)=>{
            if (sector.enabled){
                sector.enabled = "Si"
            } else if (sector.enabled === false) {
                sector.enabled = "No"
            }
            return sector;
        })
    }

    return (
        <div className="my-4">
            <div className='flex flex-row flex-wrap w-full justify-between items-center gap-2'>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={setRowsPerPage}
                    totalPages={sectorsData.totalPages}
                    pageNumberLimit={pageNumberLimit}
                    maxPageLimit={maxPageLimit}
                    setMaxPageLimit={setMaxPageLimit}
                    minPageLimit={minPageLimit}
                    setMinPageLimit={setMinPageLimit}
                />
                {/*<p>Total de elementos: {sectorsData.totalItems.toString() || "Cargando..."}</p>*/}

            </div>

            <MyIconTable
                data={formatSectorData( sectorsData.rowData)}
                columns={tableColumns}
                isLoading={sectorsData.isLoading}
                actionRow={true}
                handleModify={handleModify}
                handleDelete={handleDelete}
                />


            <div className='flex flex-row flex-wrap w-full justify-between items-center gap-2'>
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setRowsPerPage={setRowsPerPage}
                    totalPages={sectorsData.totalPages}
                    pageNumberLimit={pageNumberLimit}
                    maxPageLimit={maxPageLimit}
                    setMaxPageLimit={setMaxPageLimit}
                    minPageLimit={minPageLimit}
                    setMinPageLimit={setMinPageLimit}
                />
                {/*<p>Total de elementos: {sectorsData.totalItems.toString() || "Cargando..."}</p>*/}

            </div>
        </div>
    );
};

export default SectorTable;