import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LivreurDemandeLivraisons() {
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
      await axios.post(`${process.env.REACT_APP_API_URL}/livreur/markCancled/${selectedActionId}`, { cancledReason: reason });
      setCancelReason(reason);
      setPopupVisible(false);
      setShowReasons(false); // Hide the reason selection
      fetchDemandes(); // Refresh the list after cancelation
      console.log("we are here");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      {popupVisible && (
        <div className='popupHolder'>
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
               <option value="">Sélectionner une raison</option>
                <option value="Problème de trafic ou conditions météorologiques">Problème de trafic ou conditions météorologiques</option>
                <option value="Client ne répond pas">Client ne répond pas</option>
                <option value="Adresse de livraison incorrecte">Adresse de livraison incorrecte</option>
                <option value="Le client a annulé la commande">Le client a annulé la commande</option>
                <option value="Problème de paiement">Problème de paiement</option>
              </select>
            )}
          </div>
        </div>
      )}
      <div className="table-container">
        <h1>Demandes de Livraison</h1>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Prix</th>
              <th>Nature</th>
              <th>Lieu de Départ</th>
              <th>Lieu d'Arrivée</th>
              <th>Nom du Destinataire</th>
              <th>Téléphone du Destinataire</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {demandes
              .filter(demande => demande.type === "livraison") // Only show "livraison" type
              .filter(demande => !demande.delivered && demande.state !== "canceled") // Not delivered and not canceled
              .map((demande) => (
                <tr key={demande._id}>
                  <td>{demande.type}</td>
                  <td>{demande.currentPriceByAdmin}</td>
                  <td>{demande.nature}</td>
                  <td>{demande.lieuDepart}</td>
                  <td>{demande.lieuArriver}</td>
                  <td>{demande.nomDestinataire}</td>
                  <td>{demande.telephoneDestinataire}</td>
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

export default LivreurDemandeLivraisons;
