

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function HistoriqueLivraisons() {
  const [history, setHistory] = useState([]);
  const entrepriseID = localStorage.getItem("entrepriseId");
  useEffect(() => {

    const fetchHistory = async () => {
      try {
        console.log(entrepriseID);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/action/get-actions/entreprise/${entrepriseID}`); 
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, []); 

  return (
    <div className="historique-livraisons">
      <h2>Historique des Livraisons</h2>
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
            {history.map((delivery, index) => delivery?.type == "livraison" && delivery?.associatedToLiv && (
              <tr key={index}>
                <td>{delivery?.entrepriseName}</td>
               

                <td>
                    {format(
                      new Date(delivery?.dateLivraison),
                      "dd MMMM yyyy",
                      { locale: fr }
                    )}
                  </td>
                <td>{delivery?.lieuDepart}</td>
                <td>{delivery?.lieuArriver}</td>
                <td>
                  <button className="status-button" style={{backgroundColor : delivery?.state === "delivered" ? "green" : "red"}}>{delivery?.state === "delivered" ? "effectuée" : "non effectuée"}  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistoriqueLivraisons;
