

import React, { useState } from 'react';
import axios from 'axios';
import livreurImage1 from '../../Assets/livreur1.svg';
import { AppStore } from '../../Store';
import { Navigate, useNavigate } from 'react-router-dom';


function LivreurLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const t = localStorage.getItem("livreurToken")
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/livreur/login`,
      {
        username,
        password,
      });
      localStorage.setItem('livreurToken', response.data?.token);
      
      localStorage.setItem('livreurId', response.data?.livreurId);
      console.log(response.data?.livreurId);
      

      navigate('/livreur/dashboard');

      console.log("azeaze");
    } catch (error) {
      console.log(error);
    }
  };
  if(t) return <Navigate to="/livreur/dashboard"/>
  return (
    <div className="livreur-login-container">
      <div className="left-part">
        <img src={livreurImage1} alt="Livreur" className="livreur-image" />
      </div>
      <div className="right-part">
        <h2>Livreur Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default LivreurLogin;
