import React from 'react';
import { Navigate, Outlet } from 'react-router-dom'; 

import SideBarAdmin from './Components/SideBarAdmin';
import NavbarAdmin from './Components/NavbarAdmin';

function Dashboard() {
  if(!localStorage.getItem("AdminToken")) return <Navigate to="/admin/login" />;
  return (
    <div className='userDashboard'>
      <SideBarAdmin/>
      <main>
        <NavbarAdmin/>
        
        <div className='dashboardOutletHolder'>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
