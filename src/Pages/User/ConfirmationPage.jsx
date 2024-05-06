// ConfirmationPage.js

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function ConfirmationPage() {
  const { actionId } = useParams();
  const [actionDetails, setActionDetails] = useState({});
  const history = useHistory();

  useEffect(() => {
    const fetchActionDetails = async () => {
      try {
        // Fetch action details by ID
        const response = await fetch(`actions/${actionId}`); 
        if (response.ok) {
          const data = await response.json();
          setActionDetails(data);
        } else {
          throw new Error('Failed to fetch action details');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchActionDetails();
  }, [actionId]);

  const handleAccept = () => {
    // Update action status to 'confirmed'
    // Redirect to dashboard
    history.push('/dashboard');
  };

  const handleDecline = () => {
    // Update action status to 'declined'
    // Redirect to dashboard
    history.push('/dashboard');
  };

  return (
    <div>
      <h1>Page de confirmation</h1>
      <p>Prix fixé par l'administrateur : {actionDetails.priceByAdmin}</p>
      <p>Message: {actionDetails.message}</p>
      <p>Date fixée par l'administrateur : {actionDetails.dateByAdmin}</p>
      <button onClick={handleAccept}>Accepter</button>
      <button onClick={handleDecline}>Refuser</button>
    </div>
  );
}

export default ConfirmationPage;
