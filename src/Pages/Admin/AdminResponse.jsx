import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function AdminResponse() {
    const { id, type } = useParams();
    const [requestData, setRequestData] = useState({});
    const [responseMessage, setResponseMessage] = useState('');
    const [responseDate, setresponseDate] = useState("")
    const [responsePrice , setResponsePrice] =  useState(0)
    const navigate = useNavigate();
    useEffect(() => {
        // Fetch request data based on ID
        axios.get(`${process.env.REACT_APP_API_URL}/action/get-action/${id}`)
            .then(response => {
                setRequestData(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching request data:', error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Construct your response data
        const responseData = {
            actionId : id,
            currentPriceByAdmin : responsePrice,
            messageByAdmin : responseMessage,
            dateByAdmin :responseDate
        };

        // Send the response data to your backend
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/adminResponse`, responseData);
            console.log('Response saved successfully:', response.data);
            return navigate("/admin/dashboard");
            // Handle success (e.g., show success message, redirect, etc.)
        } catch (error) {
            console.error('Error saving response:', error);
            // Handle error (e.g., show error message)
        }
    };

    return (
        <div className="admin-response-container"> {/* Add a class name */}
            <h2 className='adminResponseHeaderTitle'>Repondre a {type === 'demenagement' ? 'la demande de demenagement ' : 'Delivery Request'} <span>ID: {id}</span></h2>
            {type === 'demenagement' && (
                <form onSubmit={handleSubmit} className="response-form"> 
                    
                    <div className='imagesHolderInAdminResponse'>
                      <h1>Photo Meuble</h1>
                      <div>
                      {requestData.photosMeuble?.map(imgSrc=>(<img src={imgSrc}></img>))}
                      </div>
                    </div>
                    <p>Type Local Depart:  <span>{requestData.typeLocalDepart}</span></p>
                    <p>Type Local Arrivee: <span>{requestData.typeLocalArrivee}</span></p>
                    <p>Ascenseur Depart: <span>{requestData.ascenseurDepart}</span></p>
                    <p>Ascenseur Arrivee: <span>{requestData.ascenseurArrivee}</span></p>
                    <p>Etage Meubles: <span>{requestData.etageMeubles}</span></p>
                    <p>Etage Souhaite: <span>{requestData.etageSouhaite}</span></p>
                    <p>Lieu Depart: <span>{requestData.lieuDepart}</span></p>
                    <p>Lieu Arrivee: <span>{requestData.lieuArriver}</span></p>
                    <p>Date Demenagement: <span>{requestData.dateDemenagement}</span></p>
                    <p>Heure Demenagement: <span>{requestData.heureDemenagement}</span></p>
                    <p>User ID: <span>{requestData.userId}</span></p>
                    <p>User Name: <span>{requestData.userName}</span></p>

                    <div className='adminResponseFormHolder'>
                      <h1>Admin Response</h1>
                      <div className='priceSelection'>
                        <label>Price $ By Admin</label>
                        <input required placeholder='Type Price For This Action' type='number'onChange={(e)=>setResponsePrice(e.target.value)}></input>
                      </div>
                      <div className='dateSelection'>
                        <label>Date By Admin</label>
                        <input required  type='datetime-local' onChange={(e)=>setresponseDate(e.target.value)}></input>
                      </div>
                      <div className='adminMessage'>
                        <label>Message</label>
                        <textarea required placeholder="type message" cols="30" rows="10" onChange={(e)=>setResponseMessage(e.target.value)}></textarea>
                      </div>
                      <button type="submit">Submit Response</button>
                    </div>
                </form>
            )}

            {type === 'livraison' && (
                <form onSubmit={handleSubmit} className="response-form"> 
                    
                   
                    
                    
                    
                    <p>Lieu Depart: <span>{requestData.lieuDepart}</span></p>
                    <p>Lieu Arrivee: <span>{requestData.lieuArriver}</span></p>
                    <p>Date Livraison: <span>{requestData.dateLivraison}</span></p>
                    <p>Heure Livraison: <span>{requestData.heureLivraison}</span></p>
                    <p>User ID: <span>{requestData.userId}</span></p>
                    <p>User Name: <span>{requestData.userName}</span></p>

                    <div className='adminResponseFormHolder'>
                      <h1>Admin Response</h1>
                      <div className='priceSelection'>
                        <label>Price $ By Admin</label>
                        <input required placeholder='Type Price For This Action' type='number'onChange={(e)=>setResponsePrice(e.target.value)}></input>
                      </div>
                      <div className='dateSelection'>
                        <label>Date By Admin</label>
                        <input required  type='datetime-local' onChange={(e)=>setresponseDate(e.target.value)}></input>
                      </div>
                      <div className='adminMessage'>
                        <label>Message</label>
                        <textarea required placeholder="type message" cols="30" rows="10" onChange={(e)=>setResponseMessage(e.target.value)}></textarea>
                      </div>
                      <button type="submit">Submit Response</button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default AdminResponse;
