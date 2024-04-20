import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LivreurDemandeLivraisons() {
  const [demandes, setDemandes] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedActionId, setSelectedActionId] = useState(null);

  const [cancelReason, setCancelReason] = useState("");
  const [showReasons , setShowReasons ] = useState("")
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
    console.log(reason);
    await axios.post(`${process.env.REACT_APP_API_URL}/livreur/markCancled/${selectedActionId}`,{cancledReason : reason});
    setCancelReason(reason);
    setPopupVisible(false);
  };

  return (
    <div className="container">
      {popupVisible && (
        <div className='popupHolder'>
          <div className="popup">
            <h2>La livraison est-elle effectuée ?</h2>
            <button onClick={() => handleDeliveryStatusChange("Effectuee")}>Effectuée</button>
            {!showReasons && <button onClick={() => setShowReasons(true)}>Annuler</button>}
            {showReasons && (
              <select value={cancelReason} onChange={(e) => handleCancelReasonChange(e.target.value)}>
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
        <h1>Demandes de Livraison</h1>
        <table>
          <thead>
            <tr>
              <th>ID de l'action</th>
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
            {demandes.map((demande) => !demande.delivered&& demande.state !== "cancled" && (
              <tr key={demande._id}>
                <td>{demande._id}</td>
                <td>{demande.currentPriceByAdmin}</td>
                <td>{demande.nature}</td>
                <td>{demande.lieuDepart}</td>
                <td>{demande.lieuArriver}</td>
                <td>{demande.nomDestinataire}</td>
                <td>{demande.telephoneDestinataire}</td>
                <td>
                  <button onClick={() => markDelivered(demande._id)}>
                    {demande.delivered ? "Effectuer" : "NON Effectuer"}
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
