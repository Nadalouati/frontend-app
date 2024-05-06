import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfilePageLiv() {
  const [profile, setProfile] = useState({
    username: '',
    password: '',
    nom: '',
    prenom: '',
    numTelephone: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const livreurId = localStorage.getItem('livreurId');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/livreur/getProfile/${livreurId}`
        );
        if (response.status === 200) {
          setProfile(response.data); // Mettre à jour le profil avec les valeurs existantes
        } else {
          console.error('Error fetching profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []); // L'effet se déclenche une seule fois au montage du composant

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const livreurId = localStorage.getItem('livreurId');
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/livreur/updateProfile/${livreurId}`,
        profile
      );
      if (response.status === 200) {
        navigate('/livreur/dashboard'); // Navigation après mise à jour réussie
      } else {
        throw new Error('La mise à jour du profil a échoué');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Modifier le Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Nom d'utilisateur:</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={profile.nom}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Prénom:</label>
          <input
            type="text"
            name="prenom"
            value={profile.prenom}
            onChange={handleChange}
          />
        </div>
        <div class="form-group">
          <label>Numéro de téléphone:</label>
          <input
            type="number"
            name="numTelephone"
            value={profile.numTelephone}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Modifier le Profile
        </button>
      </form>
    </div>
  );
}

export default ProfilePageLiv;
