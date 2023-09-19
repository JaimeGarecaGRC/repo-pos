import React, {useContext, useState} from 'react';
import UserContext from "../../../context/UserContext";
import Pagination from "@components/Table/Pagination";
import MyTable from "@components/Table/MyTable";


const UsersTable = () => {
    const {
        usersData,
        setRowsPerPage,
        currentPage,
        setCurrentPage,
        tableColumns,
    } = useContext(UserContext);

    const pageNumberLimit = 10;
    const [maxPageLimit, setMaxPageLimit] = useState(pageNumberLimit);
    const [minPageLimit, setMinPageLimit] = useState(0);

    const {
        setShowUserDataModal,
        setShowModifyModal,
        setSelectedUser,
        setShowDropModal} = useContext(UserContext)


    const handleProfile = (user) => {
        setSelectedUser(user);
        setShowUserDataModal(true);
    }
    const handleModify = (user) => {
        setSelectedUser(user);
        setShowModifyModal(true);
    }
    const handleDelete = (user) => {
        setSelectedUser(user);
        setShowDropModal(true);
    }

    return (
            <div className="my-4">
                <div className='flex flex-row flex-wrap w-full justify-between items-center gap-2'>
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                        totalPages={usersData.totalPages}
                        pageNumberLimit={pageNumberLimit}
                        maxPageLimit={maxPageLimit}
                        setMaxPageLimit={setMaxPageLimit}
                        minPageLimit={minPageLimit}
                        setMinPageLimit={setMinPageLimit}
                        />
                    <p>Total de elementos: {usersData.totalItems.toString() || "Cargando..."}</p>
                </div>

                <MyTable
                        data={usersData.rowData}
                        columns={tableColumns}
                        isLoading={usersData.isLoading}
                        actionRow={true}
                        handleProfile={handleProfile}
                        handleModify={handleModify}
                        handleDelete={handleDelete}
                />

                <div className='flex flex-row flex-wrap w-full justify-between items-center gap-2'>
                    <Pagination
                        totalRows={usersData.totalItems}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setRowsPerPage={setRowsPerPage}
                        totalPages={usersData.totalPages}
                        pageNumberLimit={pageNumberLimit}
                        maxPageLimit={maxPageLimit}
                        setMaxPageLimit={setMaxPageLimit}
                        minPageLimit={minPageLimit}
                        setMinPageLimit={setMinPageLimit}
                    />
                    <p>Total de elementos: {usersData.totalItems.toString() || "Cargando..."}</p>
                </div>

            </div>
    );
};

export default UsersTable;