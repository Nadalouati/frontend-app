import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminResponse() {
  const { id, type } = useParams();
  const [requestData, setRequestData] = useState({});
  const [responseMessage, setResponseMessage] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [responsePrice, setResponsePrice] = useState(0);
  const [localId, setLocalId] = useState(null); // Local sequential ID state
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/action/get-action/${id}`)
      .then(response => {
        setRequestData(response.data[0]);
        generateLocalId(response.data[0]); // Generate local ID based on the fetched data
      })
      .catch(error => {
        console.error('Error fetching request data:', error);
      });
  }, [id]);

  const generateLocalId = (data) => {
    // This function should determine the local ID based on the data or some logic
    // For example, you can use a counter or another attribute of the data
    // Here we simulate it by simply using a static counter or data attribute
    const idFromData = data.someAttribute; // Replace 'someAttribute' with your logic
    setLocalId(idFromData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const responseData = {
      actionId: id,
      currentPriceByAdmin: responsePrice,
      messageByAdmin: responseMessage,
      dateByAdmin: responseDate
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/adminResponse`, responseData);
      if (response.status === 200) {
        toast.success('Vous Avez envoyez votre offre avec succes  ✅✅  !!', {
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

        setTimeout(() => navigate("/Admin/dashboard"), 5000);
      } else {
        throw new Error('Failed to submit response');
      }
    } catch (error) {
      console.error('Error saving response:', error);
    }
  };

  return (
    <div className="admin-response-container">
      <h2 className='adminResponseHeaderTitle'>
        Repondre a {type === 'demenagement' ? 'la demande de demenagement ' : 'la demande de livraison'} 
      </h2>
      {type === 'demenagement' && (
        <form onSubmit={handleSubmit} className="response-form">
          <div className='imagesHolderInAdminResponse'>
            <h1>Photo Meuble</h1>
            <div>
              {requestData.photosMeuble?.map((imgSrc, index) => (
                <img key={index} src={imgSrc} alt={`Photo ${index}`} />
              ))}
            </div>
          </div>
          <p>Type Local Depart: <span>{requestData.typeLocalDepart}</span></p>
          <p>Type Local Arrivee: <span>{requestData.typeLocalArrivee}</span></p>
          <p>Ascenseur Depart: <span>{requestData.ascenseurDepart}</span></p>
          <p>Ascenseur Arrivee: <span>{requestData.ascenseurArrivee}</span></p>
          <p>Etage Meubles: <span>{requestData.etageMeubles}</span></p>
          <p>Etage Souhaite: <span>{requestData.etageSouhaite}</span></p>
          <p>Lieu Depart: <span>{requestData.lieuDepart}</span></p>
          <p>Lieu Arrivee: <span>{requestData.lieuArrivee}</span></p>
          <p>Date Demenagement: <span>{requestData.dateDemenagement}</span></p>
          <p>Heure Demenagement: <span>{requestData.heureDemenagement}</span></p>
          <p>identifiant utilisateur: <span>{requestData.userId}</span></p>
          <p>nom d'utilisateur: <span>{requestData.userName}</span></p>

          <div className='adminResponseFormHolder'>
            <h1>Réponse de l'administrateur</h1>
            <div className='priceSelection'>
              <label>Prix  Par l'administrateur</label>
              <input required placeholder='Indiquez le prix pour cette action' type='number' onChange={(e) => setResponsePrice(e.target.value)} />
            </div>
            <div className='dateSelection'>
              <label>Date de l'administrateur</label>
              <input required type='datetime-local' onChange={(e) => setResponseDate(e.target.value)} />
            </div>
            <div className='adminMessage'>
              <label>Message</label>
              <textarea required placeholder="envoyer un message" cols="30" rows="10" onChange={(e) => setResponseMessage(e.target.value)}></textarea>
            </div>
            <button type="submit">Soumettre la réponse</button>
          </div>
        </form>
      )}

      {type === 'livraison' && (
        <form onSubmit={handleSubmit} className="response-form">
          <p>Taille: <span>{requestData.taille}</span></p>
          <p>poids: <span>{requestData.poids}</span></p>
          <p>nature: <span>{requestData.nature}</span></p>
          <p>categorie: <span>{requestData.category}</span></p>
          <p>Lieu Depart: <span>{requestData.lieuDepart}</span></p>
          <p>Lieu Arrivee: <span>{requestData.lieuArrivee}</span></p>
          <p>Date Livraison: <span>{requestData.dateLivraison}</span></p>
          <p>Heure Livraison: <span>{requestData.heureLivraison}</span></p>
          <p>Identifiant utilisateur : <span>{requestData.userId}</span></p>
          <p>Nom d'utilisateur : <span>{requestData.userName}</span></p>

          <div className='adminResponseFormHolder'>
            <h1>Réponse de l'administrateur</h1>
            <div className='priceSelection'>
              <label>Prix par l'administrateur</label>
              <input required placeholder='Indiquez le prix pour cette action' type='number' onChange={(e) => setResponsePrice(e.target.value)} />
            </div>
            <div className='dateSelection'>
              <label>Date fixée par l'administrateur</label>
              <input required type='datetime-local' onChange={(e) => setResponseDate(e.target.value)} />
            </div>
            <div className='adminMessage'>
              <label>Message</label>
              <textarea required placeholder="envoyer un  message" cols="30" rows="10" onChange={(e) => setResponseMessage(e.target.value)}></textarea>
            </div>
            <button type="submit">Soumettre une réponse</button>
          </div>
        </form>
      )}

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

export default AdminResponse;
