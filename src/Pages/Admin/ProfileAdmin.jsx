import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProfileAdmin() {
  const [profile, setProfile] = useState({
    
    password: '',
    
    
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const adminId = localStorage.getItem('adminId');
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/getProfile/${adminId}`
        );
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
  }, []);

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
      const adminId = localStorage.getItem('adminId');
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/updateProfile/${adminId}`,
        profile
      );
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
        setTimeout(() => navigate('/admin/dashboard'), 5000); // Navigation après mise à jour réussie
      } else {
        toast.error('La mise à jour du profil a échoué');
      }
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du profil:', error.message);
      console.error('Erreur lors de la mise à jour du profil:', error);
    }
  };

  return (
    <div className="profile-container">
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
      <h2 className="profile-title">Modifier le Profil</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        
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
       
       
        <button type="submit" className="submit-button">
          Modifier le Profil
        </button>
      </form>
    </div>
  );
}

export default ProfileAdmin;
