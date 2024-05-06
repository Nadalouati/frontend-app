import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LivreurDemandeDem() {
  const [demandes, setDemandes] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState(null);

  const [cancelReason, setCancelReason] = useState("");
  const [showReasons, setShowReasons] = useState(false);

  const fetchDemandes = async () => {
    try {
      const livreurId = localStorage.getItem("livreurId");
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/livreur/checkActions/${livreurId}`);
      setDemandes(response.data.hasActions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const markDelivered = async (actionId) => {
    setSelectedActionId(actionId);
    setPopupVisible(true);
  };

  const handleDeliveryStatusChange = async (status) => {
    try {
      if (status === "Effectuee") {
        await axios.post(`${process.env.REACT_APP_API_URL}/livreur/markDelivered/${selectedActionId}`);
        fetchDemandes();
        setPopupVisible(false);
      } else {
        setPopupVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelReasonChange = async (reason) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/livreur/markCanceled/${selectedActionId}`, { canceledReason: reason });
      setCancelReason(reason);
      setPopupVisible(false);
      setShowReasons(false); // Hide reason selection
      fetchDemandes(); // Refresh the list after cancellation
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {popupVisible && (
        <div className="popupHolder">
          <div className="popup">
            <h2>La livraison est-elle effectuée ?</h2>
            <button onClick={() => handleDeliveryStatusChange("Effectuee")}>Effectuée</button>
            {!showReasons && (
              <button onClick={() => setShowReasons(true)}>Annuler</button>
            )}
            {showReasons && (
              <select
                value={cancelReason}
                onChange={(e) => handleCancelReasonChange(e.target.value)}
              >
                <option value="">Choisir une raison d'annulation</option>
                <option value="Client ne répond pas">Client ne répond pas</option>
                <option value="Il n'a pas accepté la livraison">Il n'a pas accepté la livraison</option>
                <option value="Il a appelé et annulé">Il a appelé et annulé</option>
              </select>
            )}
          </div>
        </div>
      )}
      <div className="table-container">
        <h1>Demandes de Déménagement</h1>
        <table>
          <thead>
            <tr>
            <th>Nom</th>
              <th>Date</th>
              <th>Prix</th>
              <th>Lieu de Départ</th>
              <th>Lieu d'Arrivée</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {demandes
              .filter(demande => demande.type === "déménagement") // Only show "déménagement" type
              .filter(demande => !demande.delivered && demande.state !== "canceled") // Not delivered and not canceled
              .map((demande) => (
                <tr key={demande._id}>
                   <td>{demande.userName}</td>
                  <td>{demande.confirmed_time}</td>
                  <td>{demande.currentPriceByAdmin}</td>
                  <td>{demande.lieuDepart}</td>
                  <td>{demande.lieuArriver}</td>
                  <td>
                    <button onClick={() => markDelivered(demande._id)}>
                      {demande.delivered ? "Effectuée" : "NON Effectuée"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LivreurDemandeDem;
