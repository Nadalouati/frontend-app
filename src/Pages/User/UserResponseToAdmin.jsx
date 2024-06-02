import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserResponseToAdmin() {
  const { actionId } = useParams();
  const [action, setAction] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user notifications
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/action/get-action/${actionId}`);
        setAction(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [actionId]);

  const acceptHandle = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/action/update-conf/${actionId}`, { confirmed_time: new Date().toDateString() });
      toast.success('Vous avez accepté l\'offre! Vous pouvez suivre votre demande dans l\'historique.✅✅', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: "Bounce",
      });
      setTimeout(() => navigate("/user/dashboard"), 5000);
    } catch (error) {
      console.error(error);
    }
  };

  const declineHandle = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/action/update-conf/${actionId}`, { declined_time: new Date().toDateString() });
      toast.error('Vous avez refusé l\'offre de l\'admin❌ La prochaine fois, j\'espère que ce sera approprié.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: "Bounce",
      });
      setTimeout(() => navigate("/user/dashboard"), 5000);
    } catch (error) {
      console.error(error);
    }
  };

  if (action?.confirmed_time || action?.declined_time) return <Navigate to="/user" />;
  return (
    <div className='UserResponseToAdminPage'>
      <h1>Réponse à l'administrateur concernant l'action : </h1>
      <h2 className='bb'>Prix proposé par l'administrateur : <span>{action[0]?.currentPriceByAdmin} TND</span></h2>
      <h2 className='bb'>Date fournie par l'administrateur : <span>{new Date(action[0]?.dateByAdmin).toLocaleString()}</span></h2>
      <p className='bb'>Message de l'administrateur : <span>{action[0]?.messageByAdmin}</span></p>
      <div className='acceptHolder'>
        <button style={{ backgroundColor: "green" }} onClick={acceptHandle}>Accepter</button>
        <button style={{ backgroundColor: "red" }} onClick={declineHandle}>Refuser</button>
      </div>
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
        transition="Bounce"
      />
    </div>
  );
}

export default UserResponseToAdmin;
