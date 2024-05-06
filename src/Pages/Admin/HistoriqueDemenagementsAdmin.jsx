import React, { useState, useEffect } from 'react';
import axios from 'axios';

function HistoriqueDemenagementsAdmin() {
  const [history, setHistory] = useState([]);

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

  return (
    <div className="historique-demenagement">
      <h2>Historique des Demenagements</h2>
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
            {history.map((delivery, index) => (
              delivery.type === "demenagement" && delivery.confirmed_time && (
                <tr key={index}>
                  <td>{delivery.userName}</td>
                  <td>{delivery.confirmed_time}</td>
                  <td>{delivery.currentPriceByAdmin}</td>
                  <td>{delivery.lieuDepart}</td>
                  <td>{delivery.lieuArriver}</td>
                  <td>
                  <button className="status-button" style={{backgroundColor : delivery?.state === "delivered" ? "green" : "red"}}>{delivery?.state === "delivered" ? "effectuée" : "non effectuée"}  </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoriqueDemenagementsAdmin;
