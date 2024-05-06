import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LiaThumbtackSolid } from "react-icons/lia";


function DemandeDemenagementsAdmin() {
  const [pendingActions, setPendingActions] = useState([]);

  useEffect(() => {
    const fetchPendingActions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/action/pending`);
        setPendingActions(response.data); 
      } catch (error) {
        console.error('Error fetching pending actions:', error);
      }
    };

    fetchPendingActions();
  }, []);

  return (
    <div className="demande-container">
      <h2 className="title">Vous avez reçu de nouvelles demandes</h2>
      <div className="spacer"></div>
      <div className="card-container">
        {pendingActions.length === 0 ? (
          <p>Aucune action en attente</p>
        ) : (
          pendingActions.map((action,key) => action.type === "demenagement" && (
            <div key={action._id} className="card">

              <Link to={action?.creatorRole === "user" ? `/admin/dashboard/admin-response/demenagement/${action._id}` : `/admin/dashboard/assosiateToLiv/${action?._id}`} className="link">
              <LiaThumbtackSolid />  <h3 className="action-id">Identifiant de l'action : <span className="black-text">{key === 0 ? key +1 : key}</span></h3>
                <h3 className="user-name">Nom d'utilisateur : <span className="black-text">{action.userName}</span></h3>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DemandeDemenagementsAdmin;
