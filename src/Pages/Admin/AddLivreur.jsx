import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddLivreur() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [numTelephone, setNumTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
        toast.success(' Vous Avez Cree Un Livreur avec succes ✅✅!!', {
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

        setUsername('');
        setPassword('');
        setNom('');
        setPrenom('');
        setNumTelephone('');
        setEmail('');
        setErrorMessage('');

        setTimeout(() => navigate("/Admin/dashboard"), 5000); // Replace '/some-path' with your desired path
      } else {
        throw new Error('Failed to create Livreur');
      }
    } catch (error) {
      console.error('Error creating Livreur:', error);
      setErrorMessage(error.message || 'Failed to create Livreur');
    }
  };

  return (
    <div className="add-livreur-container">
      <div className="add-livreur-box">
        <h2 className="add-livreur-title">Ajouter Livreur</h2>
        <form className="add-livreur-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nom d'utilisateur :</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder='Tapez le nom '
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='tapez le mot de passe'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="nom">Nom:</label>
            <input
              type="text"
              id="nom"
              value={nom}
              placeholder='tapez le nom'
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prenom">Prénom:</label>
            <input
              type="text"
              id="prenom"
              value={prenom}
              placeholder='Tapez le prénom'
              onChange={(e) => setPrenom(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numTelephone">Numéro de téléphone:</label>
            <input
              type="tel" 
              id="numTelephone"
              value={numTelephone}
              placeholder='tapez le numéro de télephone'
              onChange={(e) => setNumTelephone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder='Tapez le mail '
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Ajouter Livreur</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
        transition={Bounce}
      />
    </div>
  );
}

export default AddLivreur;
