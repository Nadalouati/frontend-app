import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfilePageLiv() {
  const [profile, setProfile] = useState({
    password: '',
    name: '',
    email: '',
  });

  const navigate = useNavigate();
  const entrepriseId = localStorage.getItem("entrepriseId");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/entreprise/get-entreprise-profile/${entrepriseId}`);
        if (response.status === 200) {
          setProfile({
            name: response.data.name || '',
            email: response.data.email || '',
            password: '', // Don't prefill the password field for security reasons
          });
        } else {
          throw new Error('Failed to fetch profile data.');
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [entrepriseId]);

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
        `${process.env.REACT_APP_API_URL}/entreprise/update/${entrepriseId}`,
        profile
      );

      if (response.status === 200) {
        toast.success('Vous Avez Modifier Votre Profile Avec Succès 😊😊😊!!', {
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
        setTimeout(() => {
          navigate("/entreprise/dashboard"); // Redirection après succès
        }, 5000);
      } else {
        throw new Error('La mise à jour du profil a échoué.');
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Modifier le Profil</h2>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom de l'entreprise:</label>
          <input
            required
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mot de passe:</label>
          <input
            required
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
          />
        </div>
        <button className="submit-button" type="submit">Modifier le Profil</button>
      </form>
      <ToastContainer
        position="bottom-center"
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

export default ProfilePageLiv;
