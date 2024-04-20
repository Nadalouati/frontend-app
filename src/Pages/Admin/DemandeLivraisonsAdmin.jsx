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
    <h2 className="title">Vous avez reçu de nouvelles demandes</h2>
    <div className="spacer"></div>
    <div className="card-container">
      {pendingActions.length === 0 ? (
        <p>No pending actions</p>
      ) : (
        pendingActions.map((action) => action.type === "livraison" && (
          <div key={action._id} className="card">
            <Link to={`/admin/dashboard/admin-response/livraison/${action._id}`} className="link">
            <LiaThumbtackSolid /> 
             <h3 className="action-id">Action ID: <span className="black-text">{action._id}</span></h3>
              <h3 className="user-name">User Name: <span className="black-text">{action.userName}</span></h3>
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
  );
}

export default DemandeLivraisonsAdmin;
