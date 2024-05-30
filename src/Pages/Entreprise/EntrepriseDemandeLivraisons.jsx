import React, { useState } from 'react';
import { GiWeight } from 'react-icons/gi';
import { IoMdHome, IoIosPerson, IoIosPhonePortrait, IoMdCalendar, IoIosPin } from 'react-icons/io';
import { RxDimensions } from "react-icons/rx";
import { GiBrokenShield } from "react-icons/gi";
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DemandeLivraisons() {
  const [taille, setTaille] = useState('');
  const [poids, setPoids] = useState('');
  const [nature, setNature] = useState('');
  const [lieuDepart, setLieuDepart] = useState('');
  const [lieuArriver, setLieuArriver] = useState('');
  const [dateLivraison, setDateLivraison] = useState('');
  const [nomDestinataire, setNomDestinataire] = useState('');
  const [telephoneDestinataire, setTelephoneDestinataire] = useState('');
  const entrepriseID = localStorage.getItem("entrepriseId");
  const entrepriseName = localStorage.getItem("entrepriseName");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      taille,
      poids,
      nature,
      lieuDepart,
      lieuArriver,
      dateLivraison,
      nomDestinataire,
      telephoneDestinataire,
      entrepriseID,
      creatorRole: "entreprise",
      entrepriseName,
      type: "livraison",
    };

    axios.post(`${process.env.REACT_APP_API_URL}/action/entreprise/create-action`, formData)
      .then(response => {
        console.log('Form data submitted successfully:', response.data);
        setTaille("");
        setPoids("");
        setNature("");
        setLieuDepart("");
        setLieuArriver("");
        setDateLivraison("");
        setNomDestinataire("");
        setTelephoneDestinataire("");
        toast.success('Votre demande a été envoyée avec succès 😊😊!!', {
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
      })
      .catch(error => {
        console.error('Error submitting form data:', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id='form-liv'>
        <div className="demande-livraisons">
          <div className="demande-livraisons-box">
            <h2 className="titre">Mettez votre demande de livraison</h2>
            <div className="input-container">
              <label htmlFor="taille"><RxDimensions /> Taille:</label>
              <select required id="taille" value={taille} onChange={(e) => setTaille(e.target.value)}>
                <option value="">Sélectionner</option>
                <option value="petite taille">Petite taille</option>
                <option value="grande taille">Grande taille</option>
                <option value="moyenne taille">Moyenne taille</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="poids"><GiWeight /> Poids:</label>
              <input type="text" id="poids" value={poids} onChange={(e) => setPoids(e.target.value)} required />
            </div>
            <div className="input-container">
              <label htmlFor="nature"><GiBrokenShield /> Nature:</label>
              <select id="nature" value={nature} onChange={(e) => setNature(e.target.value)} required>
                <option value="">Sélectionner</option>
                <option value="Fragile">Fragile</option>
                <option value="Robuste">Robuste</option>
              </select>
            </div>
            <div className="input-container">
              <label htmlFor="lieuDepart"><IoMdHome /> Lieu de départ:</label>
              <input type="text" id="lieuDepart" value={lieuDepart} onChange={(e) => setLieuDepart(e.target.value)} required />
            </div>
            <div className="input-container">
              <label htmlFor="lieuArriver"><IoIosPin /> Lieu d'arrivée:</label>
              <input type="text" id="lieuArriver" value={lieuArriver} onChange={(e) => setLieuArriver(e.target.value)} required />
            </div>
            <div className="input-container">
              <label htmlFor="dateLivraison"><IoMdCalendar /> Date de livraison:</label>
              <input type="date" id="dateLivraison" value={dateLivraison} onChange={(e) => setDateLivraison(e.target.value)} required />
            </div>
            <div className="input-container">
              <label htmlFor="nomDestinataire"><IoIosPerson /> Nom du destinataire:</label>
              <input type="text" id="nomDestinataire" value={nomDestinataire} onChange={(e) => setNomDestinataire(e.target.value)} required />
            </div>
            <div className="input-container">
              <label htmlFor="telephoneDestinataire"><IoIosPhonePortrait /> Téléphone du destinataire:</label>
              <input type="tel" id="telephoneDestinataire" value={telephoneDestinataire} onChange={(e) => setTelephoneDestinataire(e.target.value)} required />
            </div>
            <button type="submit" className='btnn'>Envoyer</button>
          </div>
        </div>
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

export default DemandeLivraisons;
