import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function LivreurHistoriqueDem() {
  const [history, setHistory] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/action/get-actions/${userId}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, [userId]); // Réexécuter l'effet si userId change

  return (
    <div className="historique-demenagements">
      <h2>Historique des Déménagements</h2>
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
            {history.map((delivery, index) =>
              delivery?.type === "déménagement" && delivery?.confirmed_time ? (
                <tr key={index}>
                  <td>{delivery.userName}</td>
                  {/* Utilisation de `date-fns` pour formater la date */}
                  <td>
                    {format(
                      new Date(delivery.confirmed_time),
                      "dd MMMM yyyy",
                      { locale: fr }
                    )}
                  </td>
                  <td>{delivery.currentPriceByAdmin}</td>
                  <td>{delivery.lieuDepart}</td>
                  <td>{delivery.lieuArriver}</td>
                  <td>
                    <button
                      className="status-button"
                      style={{
                        backgroundColor:
                          delivery.state === "delivered"
                            ? "green"
                            : "red",
                      }}
                    >
                      {delivery.state === "delivered"
                        ? "Effectuée"
                        : "Non effectuée"}
                    </button>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LivreurHistoriqueDem;
