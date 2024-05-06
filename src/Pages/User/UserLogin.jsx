import React, { useState , useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";
import welcomeImage from "../../Assets/undraw_access_account_re_8spm.svg"
import { Navigate } from "react-router-dom";
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
        {
          username,
          password,
        }
      );

      if (response.data.message === "Login successful") {
        const token = response.data.token;
        const userId = response.data.userId;
        const username = response.data.username;
        
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        AppStore.update((s) => {
          s.auth.token = token;
          s.userId = userId;
          s.username = username;
        });
        navigate("/user/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Internal Server Error");
    }  
  };
  
  if (auth.token) return <Navigate to="/user/dashboard" />;
  return (
    <div className="user-login-container">
      <div className="welcome-section">
        <div className="logo-container">
          <img src={require("../../Assets/logo1.png")} alt="Logo de la société" />
        </div>
        <div className="welcome-text">
          <h1>Bienvenue cher client</h1>
          <p className="white-text">Pour rester connecté avec nous, veuillez vous inscrire</p>
          <button className="green-button" onClick={()=>navigate("/user/register")}>S'inscrire</button>
        </div>
        <img src={welcomeImage} className="imageInsideWelcome"></img>
      </div>
      <div className="login-section">
        
        <div className="login-box">
          <h2>Connectez-vous à votre compte</h2>
          <form onSubmit={handleLogin}>
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
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Se connecter</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
