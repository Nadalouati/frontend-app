import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { AppStore } from '../Store';

function PrivateRoutesLivreur() {
    const livreurToken = localStorage.getItem("livreurToken");
    return(
        livreurToken ? <Outlet/> : <Navigate to="/livreur/login" />
    )
}

export default PrivateRoutesLivreur