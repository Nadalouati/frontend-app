import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePage() {
  const [profile, setProfile] = useState({
    username: '',
    password: '',
    nom: '',
    prenom: '',
    numTelephone: '',
    email: '',
    adresse:'',
  });

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`${API_URL}/user/get-user-profile/${userId}`);
        if (response.status === 200) {
          setProfile(response.data); // Mettre à jour le profil avec les valeurs existantes
        } else {
          toast.error('Erreur lors de la récupération du profil');
        }
      } catch (error) {
        toast.error('Erreur lors de la récupération du profil:', error.message);
        console.error('Erreur lors de la récupération du profil:', error);
      }
    };

    fetchProfile();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const { notifications, actions, ...rest } = profile
      const response = await axios.put(`${API_URL}/user/update-user/${userId}`, rest);

      if (response.status === 200) {
        toast.success('Vous avez modifié le profil avec succès ✅✅', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setTimeout(() => navigate("/user/dashboard"), 5000); // Redirection après succès
      } else {
        toast.error('Échec de la mise à jour du profil');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil:', error.message);
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Modifier le Profil</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={profile.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={profile.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Numéro de téléphone:</label>
          <input
            type="tel"
            name="numTelephone"
            value={profile.numTelephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Adresse:</label>
          <input
            type="text"
            name="adresse"
            value={profile.adresse}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">Modifier le Profil</button>
      </form>
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

export default ProfilePage;
