import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
    let auth = {'token':true}
    return(
        auth.token ? <Outlet/> : <Navigate to="/Admin/Login" />
    )
}

export default PrivateRoutes