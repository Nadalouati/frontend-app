import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';

function HistoriqueLivraisonsAdmin() {
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/action/all-actions`);
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []);

  const filteredHistory = history.filter(
    (delivery) => 
      delivery.type === "livraison" && 
      delivery.confirmed_time &&
      delivery.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEntrepriseHistory = history.filter(
    (delivery) =>
      delivery.type === "livraison" &&
      delivery.creatorRole === "entreprise" &&
      delivery.entrepriseName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="historique-livraisons">
      <h2>Historique des Livraisons des Clients </h2>
      
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom d'utilisateur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="history-table-container">
        <table className="history-table">
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
            {filteredHistory.map((delivery, index) => {
              const deliveryDate = new Date(delivery?.dateLivraison);
              return (
                <tr key={index}>
                  <td>{delivery.userName}</td>
                  <td>
                    {isValid(deliveryDate) ? 
                      format(deliveryDate, "dd MMMM yyyy", { locale: fr }) :
                      'Date invalide'}
                  </td>
                  <td>{delivery.currentPriceByAdmin}</td>
                  <td>{delivery.lieuDepart}</td>
                  <td>{delivery.lieuArriver}</td>
                  <td>
                    <button
                      className="status-button"
                      style={{
                        backgroundColor: delivery.state === "delivered" ? "green" : "red",
                      }}
                    >
                      {delivery.state === "delivered" ? "effectuée" : "non effectuée"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Historique des Livraisons des Entreprises</h2>

      <div className="history-table-container">
        <table className="history-table">
          <thead>
            <tr>
              <th>Nom d'entreprise</th>
              <th>Date</th>
              <th>Lieu de Départ</th>
              <th>Lieu d'Arrivée</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntrepriseHistory.map((delivery, index) => {
              const deliveredDate = new Date(delivery?.dateLivraison);
              return (
                <tr key={index}>
                  <td>{delivery.entrepriseName}</td>
                  <td>
                    {isValid(deliveredDate) ? 
                      format(deliveredDate, "dd MMMM yyyy", { locale: fr }) :
                      'Date invalide'}
                  </td>
                  <td>{delivery.lieuDepart}</td>
                  <td>{delivery.lieuArriver}</td>
                  <td>
                    <button
                      className="status-button"
                      style={{
                        backgroundColor: delivery.state === "delivered" ? "green" : "red",
                      }}
                    >
                      {delivery.state === "delivered" ? "effectuée" : "non effectuée"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoriqueLivraisonsAdmin;
