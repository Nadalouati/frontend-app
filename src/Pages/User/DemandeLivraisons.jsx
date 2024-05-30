import React, { useState } from 'react';
import { GiWeight, GiBrokenShield } from 'react-icons/gi';
import { IoMdHome, IoMdTime, IoIosPerson, IoIosPhonePortrait, IoMdCalendar, IoIosPin } from 'react-icons/io';
import { RxDimensions } from "react-icons/rx";
import { BiSolidCategory } from "react-icons/bi";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DemandeLivraisons() {
  const [taille, setTaille] = useState('');
  const [poids, setPoids] = useState('');
  const [nature, setNature] = useState('');
  const [category, setCategory] = useState('');
  const [lieuDepart, setLieuDepart] = useState('');
  const [lieuArriver, setLieuArriver] = useState('');
  const [dateLivraison, setDateLivraison] = useState('');
  const [heureLivraison, setHeureLivraison] = useState('');
  const [nomDestinataire, setNomDestinataire] = useState('');
  const [telephoneDestinataire, setTelephoneDestinataire] = useState('');
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!taille || !poids || !nature || !category || !lieuDepart || !lieuArriver || !dateLivraison || !heureLivraison || !nomDestinataire || !telephoneDestinataire) {
      toast.warn('Veuillez remplir tous les champs requis', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: "Bounce",
      });
      return; // Prevent form submission
    }

    const formData = {
      taille,
      poids,
      nature,
      category,
      lieuDepart,
      lieuArriver,
      dateLivraison,
      heureLivraison,
      nomDestinataire,
      telephoneDestinataire,
      userId,
      userName,
      creatorRole: "user",
      type: "livraison",
    };

    axios.post(`${process.env.REACT_APP_API_URL}/action/user/create-action`, formData)
      .then((response) => {
        console.log('Form data submitted successfully:', response.data);
        toast.success('Chère Client !! Votre demande a été envoyée avec succès!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
          transition: "Bounce",
        });

        // Reset form fields
        setTaille('');
        setPoids('');
        setNature('');
        setCategory('');
        setLieuDepart('');
        setLieuArriver('');
        setDateLivraison('');
        setHeureLivraison('');
        setNomDestinataire('');
        setTelephoneDestinataire('');
      })
      .catch((error) => {
        console.error('Erreur lors de la soumission du formulaire:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} id='form-liv'>
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
        theme="colored"
        transition="Bounce"
      />
      <div className="demande-livraisons">
        <div className="demande-livraisons-box">
          <h2 className="titre">Mettez votre demande de livraison</h2>
          
          <div className="input-container">
            <label htmlFor="taille"><RxDimensions /> Taille:</label>
            <select id="taille" value={taille} onChange={(e) => setTaille(e.target.value)} required>
              <option value="">Sélectionnez une taille</option>
              <option value="petite taille">Petite taille</option>
              <option value="moyenne taille">Moyenne taille</option>
              <option value="grande taille">Grande taille</option>
            </select>
          </div>
          
          <div className="input-container">
            <label htmlFor="poids"><GiWeight /> Poids:</label>
            <input type="text" id="poids" value={poids} onChange={(e) => setPoids(e.target.value)} required />
          </div>
          
          <div className="input-container">
            <label htmlFor="nature"><GiBrokenShield /> Nature:</label>
            <select id="nature" value={nature} onChange={(e) => setNature(e.target.value)} required>
              <option value="">Sélectionnez la nature</option>
              <option value="Fragile">Fragile</option>
              <option value="Robuste">Robuste</option>
            </select>
          </div>
          
          <div className="input-container">
            <label htmlFor="category"><BiSolidCategory /> Catégorie de produit:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Sélectionnez la catégorie</option>
              <option value="electronique">Électronique</option>
              <option value="vetements">Vêtements</option>
              <option value="produits_menagers">Produits ménagers</option>
              <option value="sante_beaute">Santé et beauté</option>
              <option value="articles_sport">Articles de sport</option>
              <option value="livres">Livres</option>
              <option value="alimentation">Alimentation</option>
              <option value="autre">Autre</option>
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
            <label htmlFor="heureLivraison"><IoMdTime /> Heure de livraison:</label>
            <input type="time" id="heureLivraison" value={heureLivraison} onChange={(e) => setHeureLivraison(e.target.value)} required />
          </div>
          
          <div className="input-container">
            <label htmlFor="nomDestinataire"><IoIosPerson /> Nom du destinataire:</label>
            <input type="text" id="nomDestinataire" value={nomDestinataire} onChange={(e) => setNomDestinataire(e.target.value)} required />
          </div>
          
          <div className="input-container">
            <label htmlFor="telephoneDestinataire"><IoIosPhonePortrait /> Téléphone du destinataire:</label>
            <input type="number" id="telephoneDestinataire" value={telephoneDestinataire} onChange={(e) => setTelephoneDestinataire(e.target.value)} required />
          </div>
          
          <button type="submit" className="btnn">Envoyer</button>
        </div>
      </div>
    </form>
  );
}

export default DemandeLivraisons;
