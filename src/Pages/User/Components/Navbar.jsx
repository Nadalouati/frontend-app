


import React , {useState , useEffect} from 'react';
import { IoSettingsSharp } from "react-icons/io5";
import { IoNotificationsCircle } from "react-icons/io5";
import female from "../../../Assets/undraw_female_avatar_efig.svg"
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
function Navbar() {
  const [notifications, setNotifications] = useState([]);
  const [unseenNotifications , setunseenNotifications] = useState([])
  const loc = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    // Fetch user notifications
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/user/get-notifs`,{token : token}); // Replace 'userProfile' with the actual API endpoint
        if (response) {
          setNotifications(response.data);
          setunseenNotifications(...notifications.filter(notification => !notification.seen))
        } else {
          throw new Error('Failed to fetch notifications');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, [loc]); // Ensure the effect runs only once on component mount
  return (
    <div className="navbar">
      <div className="navbar-left">
      <IoSettingsSharp className="icon" /> 
      <div className='notifsIconInNavBarHolder' onClick={()=>navigate("/user/dashboard/notifications-user")} >
        <IoNotificationsCircle className="icon" /> {notifications.filter(notification => !notification.seen)?.length>0 && <span>{notifications.filter(notification => !notification.seen)?.length}</span>}
      </div>
      </div>
      <img src={female} className='profileBtn'></img>
    </div>
  );
}

export default Navbar;
