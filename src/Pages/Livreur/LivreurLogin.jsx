import React, { useState } from 'react';
import axios from 'axios';
import livreurImage1 from '../../Assets/livreur1.svg';
import logoImage from '../../Assets/logo1.png';
import { useNavigate, Navigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LivreurLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const t = localStorage.getItem("livreurToken");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/livreur/login`, {
        username,
        password,
      });
      localStorage.setItem('livreurToken', response.data?.token);
      localStorage.setItem('livreurId', response.data?.livreurId);

      toast.success('Bienvenue sur votre interface ✅✅!!', {
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

      setTimeout(() => {
        navigate('/livreur/dashboard');
      }, 5000);

    } catch (error) {
      setError('La connexion a échoué. Veuillez vérifier vos informations.');
      console.log(error);
    }
  };

  if (t) return <Navigate to="/livreur/dashboard" />;

  return (
    <div className="livreur-login-container">
      <div className="left-part">
        <img src={livreurImage1} alt="Livreur" className="livreur-image" />
        <div className="logo-container">
          <img src={logoImage} alt="Logo de la société" className="logo-image" />
        </div>
      </div>
      <div className="right-part">
        <h2>Connectez-vous à votre compte</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <input type="password" placeholder="mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">Connexion</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      <ToastContainer />
    </div>
  );
}

export default LivreurLogin;
