import React, { useState } from 'react';
import axios from 'axios';
import imgEntreprise from '../../Assets/imgEnterprise.svg';
import logoImage from '../../Assets/logo1.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EntrepriseLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const t = localStorage.getItem("entrepriseId");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/entreprise/login`, {
        email,
        password,
      });
      localStorage.setItem('entrepriseId', response.data?.id);
      localStorage.setItem("entrepriseName", response.data?.name);

      // Show success toast notification
      toast.success('Bienvenue sur votre interface ✅✅ !!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      // Delay the navigation
      setTimeout(() => {
        navigate('/entreprise/dashboard');
      }, 5000);
    } catch (error) {
      console.log(error);
      setError('Invalid credentials. Please try again.');
    }
  };

  if (t) return <Navigate to="/entreprise/dashboard" />;

  return (
    <div className="entreprise-login-container">
      <div className="left-part">
        <img src={imgEntreprise} alt="Entreprise" className="entreprise-image" />
        <div className="logo-container">
          <img src={logoImage} alt="Logo de la société" className="logo-image" />
        </div>
      </div>
      <div className="right-part">
        <h2>Connectez-vous à votre compte</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Connexion</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default EntrepriseLogin;
