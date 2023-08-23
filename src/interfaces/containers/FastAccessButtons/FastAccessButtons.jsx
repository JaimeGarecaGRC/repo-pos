import React from 'react';
import { UserIcon, ClockIcon, DocumentChartBarIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid';

const FastAccessButtons = () => {
    return (
        <div className="w-full flex flex-wrap  my-12 place-items-center place-content-center gap-8">

            <div className="h-40 w-44 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                <div className="daisy-card-body">
                    <UserIcon className="h-20" />
                    <h2 className="daisy-card-title self-center">Usuarios</h2>
                </div>
            </div>

            <div className="h-40 w-44 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                <div className="daisy-card-body">
                    <ClockIcon className="h-20" />
                    <h2 className="daisy-card-title self-center">Historial</h2>
                </div>
            </div>

            <div className="h-40 w-44 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                <div className="daisy-card-body">
                    <ArrowsRightLeftIcon className="h-20" />
                    <h2 className="daisy-card-title self-center">Transacciones</h2>
                </div>
            </div>

            <div className="h-40 w-40 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                <div className="daisy-card-body">
                    <DocumentChartBarIcon className="h-20" />
                    <h2 className="daisy-card-title self-center">Reportes</h2>
                </div>
            </div>

    </div>
    );
};

export default FastAccessButtons;