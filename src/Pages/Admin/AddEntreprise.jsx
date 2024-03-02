import React, { useState } from 'react';
import axios from 'axios';

function AddEntreprise() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/admin/create-entreprise`;
      const response = await axios.post(apiUrl, {
        name,
        email,
        password, 
      });

      if (response.status === 201) {
        console.log('Entreprise created successfully:', response.data);
       
        setName('');
        setEmail('');
        setPassword('');
        setErrorMessage('');
      } else {
        throw new Error('Failed to create Entreprise');
      }
    } catch (error) {
      console.error('Error creating Entreprise:', error);
      setErrorMessage(error.message || 'Failed to create Entreprise'); 
    }
  };

  return (
    <div>
      <h2>Add Entreprise</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button type="submit">Add Entreprise</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default AddEntreprise;
