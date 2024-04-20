import React from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { AppStore } from '../Store';

function PrivateRoutesUser() {
    const auth = AppStore.useState(s => s.auth);
    return(
        auth.token ? <Outlet/> : <Navigate to="/user/login" />
    )
}

export default PrivateRoutesUser