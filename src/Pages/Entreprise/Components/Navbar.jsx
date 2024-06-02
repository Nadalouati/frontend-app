import React, { useState, useEffect } from 'react';
import { IoSettingsSharp, IoNotificationsCircle } from 'react-icons/io5';
import female from '../../../Assets/undraw_male_avatar_g98d.svg';

import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
 
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  
  const handleSettingsClick = () => {
    navigate("/entreprise/dashboard/profile");
  };
 


  const handleLogout = () => {
    localStorage.removeItem("entrepriseToken");
    localStorage.removeItem("entrepriseId");
    window.location.reload();
 
  };

  const toggleLogout = () => {
    setShowLogout((prevShowLogout) => !prevShowLogout);
  };

  const handleClickOutside = (e) => {
    if (!e.target.classList.contains("profileBtn")) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  

  return (
    <div className="navbar">
      <div className="navbar-left">
      <IoSettingsSharp className="icon" onClick={handleSettingsClick} />
      </div>
      <div className="navbar-right">
        <img src={female} className="profileBtn" onClick={toggleLogout} alt="Profile" />
        {showLogout && (
          <button className="logout-btn" onClick={handleLogout}>
            Déconnexion
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
