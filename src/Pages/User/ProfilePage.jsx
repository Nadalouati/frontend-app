import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/user/update-user/${localStorage.getItem("userId")}`,
        profile
      );

      if (response.status === 200) {
        navigate("/user/dashboard"); // Redirection après succès
      } else {
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
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
          <label>Prenom:</label>
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
            type="number"
            name="numTelephone"
            value={profile.numTelephone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group"> 
          <label>adresse:</label>
          <input
            type="text"
            name="adresse"
            value={profile.adresse}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">Modifier le Profile</button> 
      </form>
    </div>
  );
}

export default ProfilePage;
