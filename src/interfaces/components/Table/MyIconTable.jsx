import React, {useEffect, useMemo} from "react";
import Loader from "../Loader";
import TableActions from "@components/TableActions";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const MyIconTable = ({ columns, data, isLoading, manualPagination = false,
                         actionRow = false, handleModify = null, handleDelete = null  }) => {

    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);


    return (
        <div className="m-4 overflow-x-auto">
            {isLoading ? (
                <Loader />
            ) : (
                <table className="daisy-table w-full">
                    <thead>
                    <tr>
                        {columnData.map((data, i) => (
                            <th key={i}>{data.Header}</th>
                        ))}
                        {actionRow &&
                            <th>Acciones</th>
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {rowData.map((row, indexR) => (
                        <tr key={indexR}>
                            {columnData.map((column, indexC) => {
                                if (column.isIcon){
                                    return <td key={indexC}>
                                            <img className="h-8" src={row[column.accessor]} alt={column.name} />
                                        </td>

                                } else return <td key={indexC}>{row[column.accessor]}</td>
                            })}
                            {actionRow &&
                                <td>
                                    <TableActions  item={row} handleModify={handleModify} handleDelete={handleDelete} />
                                </td>
                            }
                        </tr>
                    ))}
                    </tbody>
                </table>

            )}
        </div>

    );
};

export default MyIconTable;