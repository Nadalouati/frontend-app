import React, { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import welcomeImage from "../../Assets/undraw_access_account_re_8spm.svg"
import { Navigate } from "react-router-dom";
import { AppStore } from "../../Store";

const UserRegister = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const auth = AppStore.useState(s => s.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/signup`,
        {
          username,
          password,
          nom,
          prenom,
          numTelephone : phone,
          email
        }
      );

      if (response.data.message === "User created successfully") {
       
        navigate("/user/login");
      }
    } catch (error) {
      console.error(error);
      setError("Internal Server Error");
    }  
  };

  

  if(auth.token) return <Navigate to="/user/dashboard"/>
  return (
    <div className="user-register-container">
      <div className="welcome-section">
        <div className="logo-container">
          <img src={require("../../Assets/logo1.png")} alt="Logo de la société" />
        </div>
        <div className="welcome-text">
          <h1>Bienvenue cher client</h1>
          <p className="white-text">Pour rester connecté avec nous, veuillez vous
connecter avec votre nom d'utilisateur et
votre mot de passe
</p>
          <button className="green-button" onClick={()=>navigate("/user/login")}>Se connecter</button>
        </div>
        <img src={welcomeImage} className="imageInsideWelcome"></img>
      </div>
      <div className="register-section">
        <nav className="navbar">
          <ul>
            <li>Accueil</li>
            <li>À propos de nous</li>
            <li>Nos services</li>
            <li>Contact</li>
          </ul>
        </nav>
        <div className="register-box">
          <h2>Créer un compte
</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>
                <IoIosMail />
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
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>
                <IoIosMail />
              </label>
              <input
                type="text"
                id="prenom"
                value={prenom}
                placeholder="Prénom"
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>
                <IoIosMail />
              </label>
              <input
                type="text"
                id="name"
                value={nom}
                placeholder="Nom"
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>
                <IoIosMail />
              </label>
              <input
                type="tel"
                id="Numéro de téléphone"
                value={phone}
                placeholder="Numéro de téléphone"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>
                <IoIosMail />
              </label>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">S'isnscrire</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;