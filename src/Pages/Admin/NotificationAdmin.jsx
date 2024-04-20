import axios from 'axios';
import React , {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function NotificationUser() {
    const [notifications, setNotifications] = useState([]);
    const [unseenNotifications , setunseenNotifications] = useState([])
    const navigate = useNavigate()
  useEffect(() => {
    // Fetch user notifications
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/get-notifs`,{token : token}); // Replace 'userProfile' with the actual API endpoint
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
  }, []);

  const handleClikNotif = async (id,notif) => {
    const n = notifications.filter(notification => ! (notification.actionId === id) )
    n.push({...notif,seen:true})
    await axios.put(`${process.env.REACT_APP_API_URL}/admin/update-admin-notif/`,{data : n , token :localStorage.getItem("AdminToken") })
    if(notif?.notifType === "userResponseLiv") {
      return navigate('/admin/dashboard/assosiateToLiv/'+id)
    }
  }
  return (
    <div className='notifPage'>
        <div className='innerNotifPage'>
            {notifications?.map(notif => (<div className={`notifInNotifPage ${notif?.seen ? "seen" : "notSeen"}`} onClick={()=>handleClikNotif(notif?.actionId,notif)}>
                <span id='a1'>Action id : {notif?.actionId}</span>
                <span id='a2'>{notif.message}</span>
                <span id='a3'>{notif?.repliedDate}</span>
            </div>))}
        </div>
    </div>
  )
}

export default NotificationUser