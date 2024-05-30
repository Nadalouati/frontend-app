import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { AppStore } from '../Store';

function PrivateRoutesUser() {
    const auth = localStorage.getItem("token")
    console.log();
    return(
        auth ? <Outlet/> : <Navigate to="/user/login" />
    )
}

export default PrivateRoutesUser