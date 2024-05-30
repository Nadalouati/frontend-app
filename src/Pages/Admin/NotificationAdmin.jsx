import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function NotificationUser() {
  const [confirmedNotifications, setConfirmedNotifications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [refusedNotifications, setRefusedNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("AdminToken");
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/get-notifs`,
          { token }
        );
        if (response) {
          const notifications = response.data;
          setNotifications(notifications);
          const confirmed = notifications.filter((notif) =>
            notif.message === "Le client a confirmé la demande"
          );
          const refused = notifications.filter((notif) =>
            notif.message === "Le client a refusé"
          );

          setConfirmedNotifications(confirmed);
          setRefusedNotifications(refused);
        } else {
          throw new Error("Failed to fetch notifications");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClickNotif = async (id, notif) => {
    const token = localStorage.getItem("AdminToken");
    const n = notifications.filter(notification => !(notification.actionId === id));
    n.push({ ...notif, seen: true });
    await axios.put(
      `${process.env.REACT_APP_API_URL}/admin/update-admin-notif/`,
      { data: n, token }
    );

    // Check if the notification is related to "userResponseLiv"
    if ((notif?.notifType === "userResponseLiv" || notif?.notifType === "userResponseDem") && notif.message === "Le client a confirmé la demande") {
      navigate('/admin/dashboard/assosiateToLiv/' + notif.actionId);
    }
  };

  const renderNotifType = (notifType) => {
    if (notifType === "userResponseDem") {
      return "réponse de la demande de déménagement";
    } else if (notifType === "userResponseLiv") {
      return "réponse de la demande de Livraison";
    } else {
      return notifType;
    }
  };

  return (
    <div className="notifPage">
      <div className="notifSection">
        <h2>Les demandes Confirmées</h2>
        {confirmedNotifications.map((notif, index) => (
          <div
            key={notif.actionId}
            className={`notifInNotifPage ${notif?.seen ? "seen" : "notSeen"}`}
            onClick={() => handleClickNotif(notif.actionId, notif)}
          >
            <span id="a1">Identifiant: {index + 1}</span>
            <span id="a2">{notif.message}</span>
            <span id="a2">{renderNotifType(notif.notifType)}</span>
            <span id="a3">
              {format(new Date(notif.repliedDate), 'dd MMMM yyyy', { locale: fr })}
            </span>
          </div>
        ))}
      </div>

      <div className="notifSection">
        <h2>Les demandes Refusées</h2>
        {refusedNotifications.map((notif, index) => (
          <div
            key={notif.actionId}
            className={`notifInNotifPage ${notif?.seen ? "seen" : "notSeen"}`}
            onClick={() => handleClickNotif(index + 1, notif)}
          >
            <span id="a1">Identifiant: {index + 1}</span>
            <span id="a2">{notif.message}</span>
            <span id="a2">{renderNotifType(notif.notifType)}</span>
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
