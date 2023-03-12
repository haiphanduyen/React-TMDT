import React from "react";

import { useHistory } from "react-router-dom";




const ModalIsLogOut = (props) => {
    const { reloadUI } = props;
    const history = useHistory()

    const handleConfirmLogout = (e) => {
       window.location.reload();
    };

    return (
        <div className="ModalIsLogOut">
                <div className="">You was logout</div>
                <div className="label-desc">Please re-login to continue your shop</div>
                <div className="btn-confirm" onClick={handleConfirmLogout}>Okkk</div>
        </div>
    )
};

export default ModalIsLogOut