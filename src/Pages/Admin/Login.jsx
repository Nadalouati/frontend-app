import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import adminLogB from "../../Assets/adminLogB.svg"
import { IoIosMail } from "react-icons/io";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, {
        email,
        password,
      });

      if (response.data.message === "Admin login successful") {
        localStorage.setItem("AdminToken",response.data.token);
        localStorage.setItem("adminId",response.data?._id)
        navigate("/Admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setError("Internal Server Error");
    }
  };
  
  return (
    <div className="AdminLogin">
      
      <div className="innerAdminLoginBackground">
        <div className="a"></div>
        <div></div>
      </div>

      <div className="innerAdminLoginHolder">
        <div className="a">
        <div className="">
          <img src={require("../../Assets/logo1.png")} alt="Logo de la société" />
        </div>
          <img src={adminLogB}></img>
        </div>
        <div className="b">
          <h1>Connectez a votre compte</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <IoIosMail/>
              <input
                type="email"
                id="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <RiLockPasswordFill />
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit">Se connecter</button>

        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
