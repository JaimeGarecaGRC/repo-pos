import React from 'react';
import { UserIcon, ClockIcon, DocumentChartBarIcon, ArrowsRightLeftIcon, BuildingOfficeIcon, BuildingStorefrontIcon, Cog6ToothIcon, CurrencyDollarIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

const FastAccessButtons = () => {
    return (
        <div className="w-full flex flex-wrap  my-12 place-items-center place-content-center gap-8">

            <Link to="/users">
                <div className="h-40 w-44 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                    <div className="daisy-card-body">
                        <UserIcon className="h-20" />
                        <h2 className="daisy-card-title self-center">Usuarios</h2>
                    </div>
                </div>
            </Link>
            <Link to="/users">
                <div className="h-40 w-44 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                    <div className="daisy-card-body">
                        <ClockIcon className="h-20" />
                        <h2 className="daisy-card-title self-center">Historial</h2>
                    </div>
                </div>
            </Link>

            <Link to="/transactions">
                <div className="h-40 w-44 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                    <div className="daisy-card-body">
                        <ArrowsRightLeftIcon className="h-20" />
                        <h2 className="daisy-card-title self-center">Transacciones</h2>
                    </div>
                </div>
            </Link>

            <Link to="/reports">
                <div className="h-40 w-40 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                    <div className="daisy-card-body">
                        <DocumentChartBarIcon className="h-20" />
                        <h2 className="daisy-card-title self-center">Reportes</h2>
                    </div>
                </div>
            </Link>

            <Link to="/branch">
                <div className="h-40 w-40 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                    <div className="daisy-card-body">
                        <BuildingOfficeIcon className="h-20" />
                        <h2 className="daisy-card-title self-center">Sucursales</h2>
                    </div>
                </div>
            </Link>

            <Link to="/business">
                <div className="h-40 w-40 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                    <div className="daisy-card-body">
                        <BuildingStorefrontIcon className="h-20" />
                        <h2 className="daisy-card-title self-center">Comercios</h2>
                    </div>
                </div>
            </Link>

            <Link to="/services">
                <div className="h-40 w-40 daisy-card daisy-card-compact bg-primary text-primary-content shadow-xl">
                    <div className="daisy-card-body">
                        <CurrencyDollarIcon className="h-20" />
                        <h2 className="daisy-card-title self-center">Servicios</h2>
                    </div>
                </div>
            </Link>
    </div>
    );
};

export default FastAccessButtons;