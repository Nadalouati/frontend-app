import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { AppStore } from '../Store';

function PrivateRoutesEntreprise() {
    const auth = localStorage.getItem("entrepriseToken");
    return(
        auth ? <Outlet/> : <Navigate to="/entreprise/login" />
    )
}

export default PrivateRoutesEntreprise