import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = {'token':localStorage.getItem("AdminToken")}
    return(
        auth.token ? <Outlet/> : <Navigate to="/admin/login" />
    )
}

export default PrivateRoutes