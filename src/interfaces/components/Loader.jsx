import React from "react";
import loader from "../../assets/spinner.gif"

const Loader = () => {
    return(
        <div className="w-full flex justify-center items-center">
            <img src={loader} alt = "loader" className="text-lg self-center place-self-center" />
        </div>
    )
}

export default Loader;