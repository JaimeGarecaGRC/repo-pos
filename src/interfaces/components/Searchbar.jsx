import React from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const Searchbar = () => {
    return (
        <div className="daisy-form-control text-base-content">
            <div className="daisy-input-group daisy-input-group-sm">
                <input type="text" placeholder="Buscar..." className="daisy-input daisy-input-sm daisy-input-bordered"/>
                <button className="daisy-btn daisy-btn-square daisy-btn-sm">
                    <MagnifyingGlassIcon className="h-5 w-5"/>
                </button>

            </div>

        </div>
    );
};

export default Searchbar;