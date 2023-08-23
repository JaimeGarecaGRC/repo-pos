import React from "react";

const useReportsValues = () => {
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
    return {
        periodSelection,
    }
}

export default useReportsValues;