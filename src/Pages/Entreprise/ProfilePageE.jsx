import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ProfilePageLiv() {
  const [profile, setProfile] = useState({
    password: '',
    name: '',
    email: '',
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
        `${process.env.REACT_APP_API_URL}/entreprise/update/${localStorage.getItem("entrepriseId")}`,
        profile
      );

      if (response.status === 200) {
        navigate("/entreprise/dashboard"); // Redirection après succès
      } else {
        throw new Error('La mise à jour du profil a échoué.');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Modifier le Profil</h2> {/* Utilisation de profile-title */}
      <form className="profile-form" onSubmit={handleSubmit}> {/* Utilisation de profile-form */}
        <div className="form-group"> {/* Utilisation de form-group */}
          <label>Nom de l'entreprise:</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group"> {/* Utilisation de form-group */}
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group"> {/* Utilisation de form-group */}
          <label>Mot de passe:</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
        </div>
        <button className="submit-button" type="submit">Modifier le Profil</button> {/* Utilisation de submit-button */}
      </form>
    </div>
  );
}

export default ProfilePageLiv;
