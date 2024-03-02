import React, { useState } from 'react';
import axios from 'axios';

function AddLivreur() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numTelephone, setNumTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/admin/createLivreurProfile`;
      const response = await axios.post(apiUrl, {
        username,
        password, 
        nom,
        prenom,
        numTelephone,
        email,
      });

      if (response.status === 200) {
        console.log('Livreur created successfully:', response.data);
        setUsername('');
        setPassword('');
        setNom('');
        setPrenom('');
        setNumTelephone('');
        setEmail('');
        setErrorMessage('');
      } else {
        throw new Error('Failed to create Livreur');
      }
    } catch (error) {
      console.error('Error creating Livreur:', error);
      setErrorMessage(error.message || 'Failed to create Livreur'); 
    }
  };

  return (
    <div>
      <h2>Add Livreur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="numTelephone">Numéro de téléphone:</label>
          <input
            type="tel" // Use appropriate input type for phone numbers
            id="numTelephone"
            value={numTelephone}
            onChange={(e) => setNumTelephone(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Livreur</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddLivreur;
