import React, { useContext, useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import UserFilters from '../containers/User/UserFilters';
import UsersTable from '../containers/User/UserTable';
import IconButton from '../components/IconButton';
import { ClockIcon, PlusIcon } from "@heroicons/react/24/outline"
import AppContext from '../../context/AppContext';
import UserContext from "../../context/UserContext";
import Modal from '../containers/Modal/Modal';
import ModifyUser from '../containers/Modify/ModifyUser';
import useUsersValues from '../../hooks/useUsersValues';
import DeleteUser from '../containers/Delete/DeleteUser';
import postApiData from '../../api/postApiData';
import getApiData from "../../api/getApiData";
import ProfileUser from '../containers/Profile/ProfileUser';

const Users = () => {
    
    const navigate = useNavigate();

    const userValues = useUsersValues();
    const {setError ,  searchUserUrl, getListRolesUrl} = useContext(AppContext);
    const [filters, setFilters] = useState(userValues.emptySearchUser);


    useEffect(()=>{
        userValues.setCurrentPage(1);
    },[filters])

    useEffect(() => {
        //colocar estado de carga
        userValues.setUsersData((prevState) => ({
            ...prevState,
            rowData: [],
            isLoading: true,
        }));
        //buscar a los usuarios
        const url = searchUserUrl(userValues.currentPage, userValues.rowsPerPage)
        postApiData(url, filters, setError)
        .then((response) => {
            if (response?._metadata.status){
                userValues.setUsersData({
                    isLoading: false,
                    rowData: response.data,
                    totalPages: response._metadata.pagination.total_pages,
                    totalItems: response._metadata.pagination.total_count,
                });
            }
            else {
                userValues.setUsersData({
                    isLoading: false,
                    rowData: [],
                    totalPages: 0,
                    totalItems: 0,
                })
            }
        });
    }, [userValues.currentPage, userValues.rowsPerPage, filters])

    //buscar los roles
    useEffect(() => {
        getApiData(getListRolesUrl, setError).then((response) => {
            if (response._metadata?.status) {
                userValues.setRolesSelection((prevState)=>({
                    ...prevState,
                    data: userValues.formatRoles(response.data),
                }))
            }
        })
    }, [])

    const handleCreate = () => {
        navigate('create')
    }

    return (
        <UserContext.Provider value={userValues}>
            <div className='page-content'>
                <div className='page-title-wrapper'>
                    <h1 className='page-title'>Usuarios</h1>
                    <div className='flex flex-col sm:flex-row sm:justify-end gap-4 mt-2'>
                        <IconButton
                            Icon={<PlusIcon className="icon" />}
                            text={"Crear Usuario"}
                            style={"daisy-btn-primary"}
                            action={handleCreate}
                        />
                        <IconButton
                            Icon={<ClockIcon className="icon" />}
                            text={"Ver Historial"}
                            style={"daisy-btn-secondary"}
                            action={handleCreate}
                        />

                    </div>
                </div>

                <UserFilters setFilters={setFilters} />
                <UsersTable />

                <Modal 
                    show={userValues.showUserDataModal}
                    onClose={()=>userValues.setShowUserDataModal(false)}>
                    <ProfileUser
                        item = { userValues.selectedUser }
                        onClose={()=>{userValues.setShowUserDataModal(false)}} />
                </Modal>

                <Modal 
                    show={userValues.showModifyModal}
                    onClose={()=>userValues.setShowModifyModal(false)}>
                    <ModifyUser
                        item = { userValues.selectedUser }
                        onClose={()=>userValues.setShowModifyModal(false)} />
                </Modal>

                <Modal
                    show={userValues.showDropModal}
                    onClose={()=>userValues.setShowDropModal(false)} >
                        <DeleteUser
                            item = { userValues.selectedUser }
                            onClose={()=>userValues.setShowDropModal(false)} />
                </Modal>


            </div>
        </UserContext.Provider>

    );
};

export default Users;