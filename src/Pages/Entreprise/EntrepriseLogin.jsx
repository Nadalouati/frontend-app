import React, { useState } from 'react';
import axios from 'axios';
import imgEntreprise from '../../Assets/imgEnterprise.svg'; 
import { Navigate, useNavigate } from 'react-router-dom';

function EntrepriseLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const t = localStorage.getItem("entrepriseToken")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/entreprise/login`, {
        email,
        password,
      });
      localStorage.setItem('entrepriseId', response.data?.id);
      localStorage.setItem("entrepriseName" , response.data?.name)
      navigate('/entreprise/dashboard');
    } catch (error) {
      console.log(error);
      setError('Invalid credentials. Please try again.');
    }
  };

  if(t) return <Navigate to="/entreprise/dashboard"/>;

  return (
    <div className="entreprise-login-container">
      <div className="left-part">
        <img src={imgEntreprise} alt="Entreprise" className="entreprise" />
      </div>
      <div className="right-part">
        <h2>Connexion à l'entreprise</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Connexion </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default EntrepriseLogin;
