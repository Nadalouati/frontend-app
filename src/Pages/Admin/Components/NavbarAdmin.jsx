import React, { useState, useEffect } from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotificationsCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"; 
import female from "../../../Assets/undraw_female_avatar_efig.svg";
import axios from 'axios';

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate()
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

  
  return (
    <div className="navbarAdmin">
      <div className="navbar-left">
        <IoSettingsSharp className="icon" /> 
        <div className='notifsIconInNavBarHolder' onClick={()=>navigate("/admin/dashboard/notifications-admin")} >
        <IoNotificationsCircle className="icon" /> {notifications.filter(notification => !notification.seen)?.length>0 && <span>{notifications.filter(notification => !notification.seen)?.length}</span>}
      </div>
      </div>
      <img src={female} className='profileBtn' alt="Profile"></img>
    </div>
  );
}

export default Navbar;
