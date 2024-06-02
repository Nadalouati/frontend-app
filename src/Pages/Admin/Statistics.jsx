import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import { MdOutlineQueryStats, MdDeliveryDining } from 'react-icons/md';
import { GiReceiveMoney } from 'react-icons/gi';

import styled from 'styled-components';

const StarContainer = styled.div`
  display: flex;
  direction: row;
`;

const Star = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: ${props => (props.isFilled ? '#FFD700' : '#e4e5e9')};
`;

const Statistics = () => {
  const [reasonsData, setReasonsData] = useState([]);
  const [totalInCome, settotalInCome] = useState(0);
  const [activeUsers, setactiveUsers] = useState([]);
  const [mostActiveLivreur, setmostActiveLivreur] = useState({});
  const [delivredActions, setdelivredActions] = useState(0);

  const [rating, setRating] = useState(0);

  const chartRef = useRef(null);
  const chartRef2 = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/get-stats/`);
        const response2 = await axios.get(`${process.env.REACT_APP_API_URL}/admin/mostActiveLivreur/`);
        const response3 = await axios.get(`${process.env.REACT_APP_API_URL}/user/average-rating`)
        setmostActiveLivreur(response2.data?.livreur);
        setdelivredActions(response2.data?.totalDeliveredActions);
        setReasonsData(response.data?.allStats?.reason);
        settotalInCome(response.data?.allStats?.totalInCome);
        setactiveUsers(response.data?.allStats?.topUsers);
        setRating(response3.data?.averageRating)
      } catch (error) {
        console.error('Error fetching reasons data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (reasonsData?.length > 0) {
      updateStockChart();
    }
    if (activeUsers?.length > 0) {
      updateUsersChart();
    }
  }, [reasonsData, activeUsers]);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      if (chartRef2.current) {
        chartRef2.current.destroy();
      }
    };
  }, []);

  const updateStockChart = () => {
    const labels = reasonsData.map(product => product._id);
    const data = reasonsData.map(product => product.count);
    const ctx = document.getElementById('stockChart');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Reasons for Canceled Actions',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  const updateUsersChart = () => {
    const labels = activeUsers.map(user => user.nom);
    const data = activeUsers.map(user => user.actions?.length);
    const ctx = document.getElementById('usersChart');

    if (chartRef2.current) {
      chartRef2.current.destroy();
    }

    chartRef2.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Most Active Users',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  };

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <MdOutlineQueryStats size={40} color="white" />
        <h1>Les statistiques</h1>
      </div>
      <div className='holderInStats'>

        <div className="income-card">
          <GiReceiveMoney size={48} color="white" />
          <h2>Revenu Total:</h2>
          <p>{totalInCome} TND</p>
        </div>

        <div className='avgRating'>
          <h1>La moyenne de notation</h1>
          <StarContainer>
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <Star
                  key={index}
                  isFilled={starValue <= (rating)}
                  
                >
                  ★
                </Star>
              );
            })}
          </StarContainer>
        </div>
      </div>
      <div className="reasons-card">
        <h2>Raisons des Actions Annulées:</h2>
        <canvas id="stockChart" width="700" height="700"></canvas>
      </div>
      <div className="livreur-card">
        <MdDeliveryDining size={48} color="white" />
        <h2>Livreur le Plus Actif</h2>
        <p>{mostActiveLivreur.nom}</p>
        <p>{mostActiveLivreur.email}</p>
        <p>{mostActiveLivreur.numTelephone}</p>
        <p>Actions livrées: {delivredActions}</p>
      </div>
      <div className="users-card">
        <h2>Utilisateurs les Plus Actifs</h2>
        <canvas id="usersChart" width="700" height="700"></canvas>
      </div>
    </div>
  );
};

export default Statistics;
