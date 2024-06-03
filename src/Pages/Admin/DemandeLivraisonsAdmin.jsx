import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LiaThumbtackSolid } from "react-icons/lia";
import { Link } from 'react-router-dom';

function DemandeLivraisonsAdmin() {
  const [pendingActions, setPendingActions] = useState([]);

  useEffect(() => {
    fetchPendingActions();
  }, []);

  const fetchPendingActions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/action/pending`);
      setPendingActions(response.data);
    } catch (error) {
      console.error('Error fetching pending actions:', error);
    }
  };

  return (
    <div className="demande-container">
      <h2 className="title">Vous avez reçu des nouvelles demandes</h2>
      <div className="spacer"></div>
      <div className="card-container">
        {pendingActions.length === 0 ? (
          <p>Aucune action en attente</p>
        ) : (
          pendingActions.map((action, index) => action.type === "livraison" && !action.associatedToLiv && (
            <div key={action._id} className="card">
              <Link to={action?.creatorRole === "user" ? `/admin/dashboard/admin-response/livraison/${action._id}` : `/admin/dashboard/assosiateToLiv/${action._id}`} className="link">
                <LiaThumbtackSolid />
                <h3 className="action-id">Identifiant de l'action : <span className="black-text">{index + 1}</span></h3>
                {action?.creatorRole === "user" && <h3 className="user-name">Nom d'utilisateur :<span className="black-text">{action.userName}</span></h3>}
                {action?.creatorRole !== "user" && <h3 className="user-name">Nom de l'entreprise : <span className="black-text">{action.entrepriseName}</span></h3>}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default DemandeLivraisonsAdmin;
