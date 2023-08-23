import React, {useContext, useEffect, useState} from 'react';
import useSectorsValues from "../../hooks/useSectorsValues";
import SectorContext from "../../context/SectorContext";
import IconButton from "@components/IconButton";
import SectorFilters from "../containers/Sector/SectorFilters";
import {PlusIcon} from "@heroicons/react/24/outline";
import SectorTable from "../containers/Sector/SectorTable";
import AppContext from "../../context/AppContext";
import {useNavigate} from "react-router-dom";
import postApiData from "../../api/postApiData";
import Modal from "../containers/Modal/Modal";
import DeleteSector from "../containers/Delete/DeleteSector";
import ModifySector from "../containers/Modify/ModifySector";

const Sectors = () => {

    const navigate = useNavigate();

    const sectorValues = useSectorsValues();
    const {setError, searchSectorUrl} = useContext(AppContext);
    const [filters, setFilters] = useState(sectorValues.emptySearchSector);

    useEffect(()=>{
        sectorValues.setCurrentPage(1);
    },[filters])

    useEffect(()=> {
        sectorValues.setSectorsData(prevData => ({
            ...prevData,
            rowData: [],
            isLoading: true,
        }));

        // Buscar rubros
        const url = searchSectorUrl(sectorValues.currentPage, sectorValues.rowsPerPage)
        postApiData(url, filters, setError)
        .then((response) => {
            console.log(response)
            if (response?._metadata.status){
                sectorValues.setSectorsData({
                    isLoading: false,
                    rowData: response.data,
                    totalPages: response._metadata.pagination.total_pages,
                    totalItems: response._metadata.pagination.total_count,
                })
            } else {
                sectorValues.setSectorsData({
                    isLoading: false,
                    rowData: [],
                    totalPages: 0,
                    totalItems: 0,
                })
            }
        });
    }, [sectorValues.currentPage, sectorValues.rowsPerPage, filters])

    const handleCreate = () => {
        navigate('/sectors/create')
    }
    const handleCloseDeleteModal = () => {
        setFilters(sectorValues.emptySearchSector)
        sectorValues.setShowDeleteModal(false);
    }
    const handleCloseModifyModal = () => {
        setFilters(sectorValues.emptySearchSector)
        sectorValues.setShowModifyModal(false);
    }
    return (
       <SectorContext.Provider value={sectorValues}>
           <div className="page-content">
                <div className="page-title-wrapper">
                   <h1 className="page-title">Rubros</h1>
                    <IconButton
                        Icon={<PlusIcon className="icon"/> }
                        text={"Crear Rubro"}
                        style={"daisy-btn daisy-btn-primary"}
                        action={handleCreate}
                    />
                   {/*<div className="text-sm daisy-breadcrumbs">*/}
                   {/*    <ul>*/}
                   {/*        <li><a>Home</a></li>*/}
                   {/*        <li><a>Documents</a></li>*/}
                   {/*        <li>Add Document</li>*/}
                   {/*    </ul>*/}
                   {/*</div>*/}

                </div>


                <SectorFilters setFilters={setFilters} />
                <SectorTable />

               <Modal
                   show={sectorValues.showModifyModal}
                   onClose={handleCloseModifyModal}>
                   <ModifySector
                       item={sectorValues.selectedSector}
                       onClose={handleCloseModifyModal}
                    />
               </Modal>

               <Modal
                   show={sectorValues.showDeleteModal}
                   onClose={handleCloseDeleteModal}>
                   <DeleteSector
                       item={sectorValues.selectedSector}
                       onClose={handleCloseDeleteModal} />
               </Modal>
           </div>
       </SectorContext.Provider>
    );
};

export default Sectors;