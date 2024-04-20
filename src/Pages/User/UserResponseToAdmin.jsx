import axios from 'axios';
import React, { useState , useEffect} from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'

function UserResponseToAdmin() {
  const {actionId} = useParams();
  const [action, setaction] = useState({})
  useEffect(() => {
    // Fetch user notifications
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/action/get-action/${actionId}`);
        setaction(...response.data)
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const navigate = useNavigate()
  const acceptHandle = async () => {
     await axios.put(`${process.env.REACT_APP_API_URL}/action/update-conf/${actionId}`,{confirmed_time : new Date().toDateString()});
     
     navigate("/user/dashboard");
    };

  const declineHandle = async () => {
    await axios.put(`${process.env.REACT_APP_API_URL}/action/update-conf/${actionId}`,{declined_time : new Date().toDateString()});
    navigate("/user/dashboard");
  };

  if(action?.confirmed_time || action?.declined_time ) return <Navigate to="/user" />
  return (
    <div className='UserResponseToAdminPage'>
      <h1>Reponse To Admin On Action <span>{actionId}</span></h1>
      <h2>Price From Admin <span>{action?.currentPriceByAdmin} TND</span></h2>
      <h2>Date From Admin : <span>{new Date(action?.dateByAdmin).toLocaleString() }</span></h2>
      <p>Admin Message : <span>{action?.messageByAdmin}</span></p>
      <div className='acceptHolder'>
        <button style={{backgroundColor : "green"}} onClick={()=>acceptHandle()}>Accept</button>
        <button style={{backgroundColor : "red"}} onClick={()=>declineHandle()}>Declince</button>
      </div>
    </div>
  )
}

export default UserResponseToAdmin