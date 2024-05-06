import React from 'react';
import { Outlet } from 'react-router-dom'; 
import SideBar from './Components/SideBar';
import Navbar from './Components/Navbar';

function EntrepriseDashboard() {
  return (
    <div className='userDashboard'>
      <SideBar/>
      <main>
        <Navbar/>
        
        <div className='dashboardOutletHolder'>
          <Outlet/>
        </div>
      </main>
    </div>
  );
}

export default EntrepriseDashboard;
