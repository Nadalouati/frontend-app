import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function HistoriqueDemenagementsAdmin() {
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredHistory = history.filter(delivery =>
    delivery.type === "demenagement" &&
    delivery.confirmed_time &&
    delivery.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="historique-demenagement">
      <h2>Historique des Demenagements</h2>
      <input
        type="text"
        placeholder="Rechercher par nom"
        className="search-bar"
        value={searchQuery}
        onChange={handleSearchChange}
      />
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
            {filteredHistory.map((delivery, index) => (
              <tr key={index}>
                <td>{delivery.userName}</td>
                <td>
                  {format(
                    new Date(delivery?.dateDemenagement),
                    "dd MMMM yyyy",
                    { locale: fr }
                  )}
                </td>
                <td>{delivery.currentPriceByAdmin}</td>
                <td>{delivery.lieuDepart}</td>
                <td>{delivery.lieuArrivee}</td>
                <td>
                  <button
                    className="status-button"
                    style={{ backgroundColor: delivery?.state === "delivered" ? "green" : "red" }}
                  >
                    {delivery?.state === "delivered" ? "effectuée" : "non effectuée"}
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

export default HistoriqueDemenagementsAdmin;
