import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import "./pagination.css"

const Pagination = ({ 
    currentPage, 
    setCurrentPage, 
    setRowsPerPage, 
    totalPages,
    pageNumberLimit,
    maxPageLimit, 
    setMaxPageLimit,
    minPageLimit,
    setMinPageLimit }) => {

    //Crear un arreglo con tamaño igual al número de páginas
    const pagesArr = [...new Array(totalPages)];
   

    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoNext, setCanGoNext] = useState(true);

    //funciones para los botones
    const onNextPage = () => {
        if ((currentPage+1) > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(currentPage + 1);}
    const onPreviousPage = () => {
        if((currentPage-1) % pageNumberLimit === 0){
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(currentPage - 1);
        
    }
    const onPageSelect = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //alertar sobre el cambio de página

    //no permitir que el usuario vaya hacia atras en la primera págino
    //o hacia adelante en la ultima página
    useEffect(() => {
        if (totalPages === currentPage) {
            setCanGoNext(false)
        } else {
            setCanGoNext(true)
        }
        if (currentPage === 1) {
            setCanGoBack(false)
        } else {
            setCanGoBack(true)
        }
    }, [totalPages, currentPage])

    const pageIntervals = [
        {
            value: 5,
            label: "Mostrar 5"
        },
        {
            value: 10,
            label: "Mostrar 10"
        },
        {
            value: 15,
            label: "Mostrar 15"
        },
        {
            value: 20,
            label: "Mostrar 20"
        },
        {
            value: 30,
            label: "Mostrar 30"
        },
        {
            value: 40,
            label: "Mostrar 40"
        },
        {
            value: 50,
            label: "Mostrar 50"
        },
    ];

    const handleSelectInterval = (selectedOption) => {
        setCurrentPage(1);
        setRowsPerPage(selectedOption.value);
    };  

    let pageIncrementEllipses = null;
    if(totalPages > maxPageLimit){
        pageIncrementEllipses = <button onClick={onNextPage} className="button-pagination mr-3">&hellip;</button>
    }
    let pageDecrementEllipses = null;
    if (minPageLimit >= 1){
        pageDecrementEllipses = <button onClick={onPreviousPage} className="button-pagination mr-3">&hellip;</button>
    }

    return (
        <div className='flex flex-row flex-wrap items-center gap-y-2 text-sm'>
                <button
                    className="button-pagination mr-3"
                    onClick={onPreviousPage}
                    disabled={!canGoBack}>
                    &#8249;
                </button>
                {pageDecrementEllipses}
                {pagesArr.map((num, index) => {
                    if ((index + 1) <= maxPageLimit && (index + 1) > minPageLimit) {
                        return (
                            <button
                                key={index}
                                onClick={() => onPageSelect(index + 1)}
                                className={`pagination-number ${index + 1 === currentPage ? "bg-base-200" : "bg-base-100"}`}>
                                {index + 1}
                            </button>
                        )
                    }
                })}
                {pageIncrementEllipses}
                <button
                    className="button-pagination ml-3"
                    onClick={onNextPage}
                    disabled={!canGoNext}>
                    &#8250;
                </button>

                <Select
                    placeholder="Seleccionar..."
                    className='ml-6 mr-4'
                    options={pageIntervals}
                    onChange={handleSelectInterval} />
                <p>Items por página </p>
            </div>

    );
};

// tutorial
// https://karthikraja555.medium.com/server-side-pagination-in-react-table-a4311b730d19
export default Pagination;