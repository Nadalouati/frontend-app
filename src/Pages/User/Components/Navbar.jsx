import React, { useState, useEffect } from 'react';
import { IoSettingsSharp, IoNotificationsCircle } from "react-icons/io5";
import female from "../../../Assets/undraw_male_avatar_g98d.svg";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/get-notifs`,
          { token }
        );
        if (response) {
          setNotifications(response.data);
        } else {
          throw new Error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [loc]);

  const handleSettingsClick = () => {
    navigate("/user/dashboard/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("rated");
    window.location.reload();
 // Navigate to the login page
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
        <div
          className="notifsIconInNavBarHolder"
          onClick={() => navigate("/user/dashboard/notifications-user")}
        >
         <IoNotificationsCircle className="icon" />
          {notifications.filter((n) => !n.seen).length > 0 && (
            <span>{notifications.filter((n) => !n.seen).length}</span>
          )}
        </div>
      </div>
      <div className="navbar-right">
        <img src={female} className="profileBtn" onClick={toggleLogout} />
        {showLogout && (
          <button className="logout-btn" onClick={handleLogout}>
            Deconnexion
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
