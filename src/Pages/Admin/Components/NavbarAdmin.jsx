import React, { useState, useEffect } from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotificationsCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"; 
import female from "../../../Assets/undraw_male_avatar_g98d.svg";
import axios from 'axios';

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate()
  



  const handleSettingsClick = () => {
    navigate("/admin/dashboard/profile");
  };
  useEffect(() => {
    // Fetch user notifications
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/get-notifs`,{token : token}); // Replace 'userProfile' with the actual API endpoint
        
        setNotifications(response.data);
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []); // Ensure the effect runs only once on component mount
  const handleLogout = () => {
    localStorage.removeItem("AdminToken");
    localStorage.removeItem("adminId");
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
    <div className="navbarAdmin">
      <div className="navbar-left">
      <IoSettingsSharp className="icon" onClick={handleSettingsClick} />
        <div className='notifsIconInNavBarHolder' onClick={()=>navigate("/admin/dashboard/notifications-admin")} >
        <IoNotificationsCircle className="icon" /> {notifications.filter(notification => !notification.seen)?.length>0 && <span>{notifications.filter(notification => !notification.seen && notification.message != "Le client a refusé" )?.length}</span>}
      </div>
      </div>
      <div className="navbar-right">
        <img src={female} className="profileBtn" onClick={toggleLogout} />
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
