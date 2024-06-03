import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns'; // Pour formater les dates
import { fr } from 'date-fns/locale'; // Pour utiliser la locale française

function HistoriqueLivraisons() {
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
  }, [userId]); // Ajout de `userId` dans les dépendances de l'effet

  return (
    <div className="historique-livraisons">
      <h2>Historique des Livraisons</h2>
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
              delivery?.type === "livraison" && delivery?.confirmed_time ? (
                <tr key={index}>
                  <td>{delivery?.userName}</td>
                  {/* Utilisation de `date-fns` pour formater la date */}
                  <td>
                    {format(
                      new Date(delivery?.confirmed_time),
                      "dd MMMM yyyy",
                      { locale: fr }
                    )}
                  </td>
                  <td>{delivery?.currentPriceByAdmin}</td>
                  <td>{delivery?.lieuDepart}</td>
                  <td>{delivery?.lieuArriver}</td>
                  <td>
                    <button
                      className="status-button"
                      style={{
                        backgroundColor:
                          delivery?.state === "delivered" ? "green" : "red",
                      }}
                    >
                      {delivery?.state === "delivered"
                        ? "effectuée"
                        : "non effectuée"}
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

export default HistoriqueLivraisons;
