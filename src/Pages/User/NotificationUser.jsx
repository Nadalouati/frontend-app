import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import StarRating from './StarRating';

function NotificationUser() {
  const [notifications, setNotifications] = useState([]);
  const [unseenNotifications, setUnseenNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user notifications
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/user/get-notifs`,
          { token: token }
        );
        if (response) {
          const notifs = response.data;
          setNotifications(notifs);
          setUnseenNotifications(
            notifs.filter((notification) => !notification.seen)
          );
        } else {
          throw new Error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClikNotif = async (id, notif) => {
    // Mettre à jour les notifications avec la notification marquée comme vue
    const updatedNotifications = notifications.map((notification) =>
      notification.actionId === id
        ? { ...notification, seen: true }
        : notification
    );

    // Mettre à jour la base de données
    await axios.put(
      `${process.env.REACT_APP_API_URL}/user/update-user-notif/${localStorage.getItem("userId")}`,
      { data: updatedNotifications }
    );

    // Naviguer vers la page de réponse avec l'actionId
    navigate('/user/dashboard/response/' + id);
  };

  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {

    setUserRating(newRating);

  }

  const handleRate = async () => {
    
    await axios.put(`${process.env.REACT_APP_API_URL}/user/update-rating/${localStorage.getItem("userId")}`,{ratingStars : userRating})
    localStorage.setItem("rated","true")
    window.location.reload()
  }

  return (
    <div className="notifPage">
      {!localStorage.getItem("rated") && <div className='ratingHolder'>
          <div className='ratingBox'>
            <h1>Star Rating Component</h1>
            <StarRating onRatingChange={handleRatingChange} />
            <button onClick={handleRate}>send rate</button>
          </div>
      </div>}
      <div className="innerNotifPage">
        {notifications?.map((notif, index) => (
          <div
            key={notif.actionId}
            className={`notifInNotifPage ${notif?.seen ? "seen" : "notSeen"}`}
            onClick={() => handleClikNotif(notif.actionId, notif)}
          >
            {/* Utiliser l'index pour afficher un identifiant séquentiel */}
            <span id="a1">Identifiant : {index + 1}</span>
            <span id="a2">{notif.message}</span>
            <span id="a3">
              {format(new Date(notif.repliedDate), 'dd MMMM yyyy', { locale: fr })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationUser;
