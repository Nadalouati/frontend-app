import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

import { RiLockPasswordFill } from "react-icons/ri";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import welcomeImage from "../../Assets/undraw_access_account_re_8spm.svg";
import { AppStore } from "../../Store";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const auth = AppStore.useState(s => s.auth);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`,
        { username, password }
      );

      if (response.data.message === "Login successful") {
        toast.success('Vous avez connectés avec succès✅✅ !', {
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

        const { token, userId, username } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);

        AppStore.update((s) => {
          s.auth.token = token;
          s.userId = userId;
          s.username = username;
        });

        setTimeout(() => navigate("/user/dashboard"), 5000);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Données invalides");
      toast.warn('Merci de vérifier vos données ❌❌!!', {
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
    }
  };

  if (localStorage.getItem("token")) return <Navigate to="/user/dashboard" />;
  
  return (
    <div className="user-login-container">
      <div className="welcome-section">
        <div className="logo-container">
          <img src={require("../../Assets/logo1.png")} alt="Logo de la société" />
        </div>
        <div className="welcome-text">
          <h1>Bienvenue cher client</h1>
          <p className="white-text">Pour rester connecté avec nous, veuillez vous inscrire</p>
          <button className="green-button" onClick={() => navigate("/user/register")}>S'inscrire</button>
        </div>
        <img src={welcomeImage} className="imageInsideWelcome" alt="Welcome" />
      </div>
      <div className="login-section">
        <div className="login-box">
          <h2>Connectez-vous à votre compte</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label>
              <FaUserAlt />
              </label>
              <input
                type="text"
                id="username"
                value={username}
                placeholder="Nom d'utilisateur"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>
                <RiLockPasswordFill />
              </label>
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Se connecter</button>
          </form>
        </div>
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
};

export default UserLogin;
