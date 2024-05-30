import React, { useState } from 'react';
import { FaCameraRetro, FaHouseUser, FaCalendarAlt, FaPhoneAlt } from "react-icons/fa";
import { FaHouseCircleCheck } from "react-icons/fa6";
import { BsFillHouseUpFill, BsFillHouseDownFill } from "react-icons/bs";
import { PiElevator } from "react-icons/pi";
import { MdApartment } from "react-icons/md";
import { TbClockHour4 } from "react-icons/tb";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function DemandeDemenagements() {
  const [imagesUrls, setImagesUrls] = useState([]);
  const [photosMeuble, setPhotosMeuble] = useState([]);
  const [typeLocalDepart, setTypeLocalDepart] = useState('');
  const [typeLocalArrivee, setTypeLocalArrivee] = useState('');
  const [ascenseurDepart, setAscenseurDepart] = useState('');
  const [ascenseurArrivee, setAscenseurArrivee] = useState('');
  const [etageMeubles, setEtageMeubles] = useState('');
  const [etageSouhaite, setEtageSouhaite] = useState('');
  const [lieuDepart, setLieuDepart] = useState('');
  const [lieuArrivee, setLieuArrivee] = useState('');
  const [dateDemenagement, setDateDemenagement] = useState('');
  const [heureDemenagement, setHeureDemenagement] = useState('');
  const [telephone, setTelephone] = useState('');
  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("username");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const uploadPromises = Array.from(photosMeuble).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'wassali'); // Replace with your Cloudinary unsigned upload preset name

        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/looklify/image/upload',
          formData
        );
        return response.data.secure_url; // Return the uploaded image URL
      });

      const uploadedUrls = await Promise.all(uploadPromises); // Wait for all uploads to complete

      // Now that all images are uploaded, update imagesUrls state
      setImagesUrls((prev) => [...prev, ...uploadedUrls]);

      // Make the second API call with updated data
      await axios.post(`${process.env.REACT_APP_API_URL}/action/user/create-action`, {
        photosMeuble: uploadedUrls, // Use uploadedUrls instead of imagesUrls
        typeLocalDepart,
        typeLocalArrivee,
        ascenseurDepart,
        ascenseurArrivee,
        etageMeubles,
        etageSouhaite,
        lieuDepart,
        lieuArrivee,
        dateDemenagement,
        heureDemenagement,
        telephone,
        userId,
        userName,
        creatorRole: "user",
        type: "demenagement"
      })
        .then(response => {
          console.log('Form data submitted successfully:', response.data);
          toast.success('Chère Client !! Votre demande a été envoyée avec succès!', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: "Bounce",
          });
          // Reset form fields
          setPhotosMeuble([]);
          setTypeLocalDepart('');
          setTypeLocalArrivee('');
          setAscenseurDepart('');
          setAscenseurArrivee('');
          setEtageMeubles('');
          setEtageSouhaite('');
          setLieuDepart('');
          setLieuArrivee('');
          setDateDemenagement('');
          setHeureDemenagement('');
          setTelephone('');
        })
        .catch(error => {
          console.error('Error submitting form data:', error);
          toast.error('Erreur lors de la soumission de la demande.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: "Bounce",
          });
        });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast.error('Erreur lors du téléchargement des images.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: "Bounce",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} id='form-demenagement'>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition="Bounce"
      />
      <div className="demande-demenagements">
        <div className="demande-demenagements-box">
          <h2 className="titre">Mettez votre demande de déménagement</h2>
          <div className="input-container">
            <label htmlFor="photosMeuble"> <FaCameraRetro /> Entrer les photos de meuble:</label>
            <input type="file" id="photosMeuble" multiple onChange={(e) => setPhotosMeuble(e.target.files)} required />
          </div>
          <div className="input-container">
            <label htmlFor="typeLocalDepart"> <BsFillHouseUpFill /> Type de votre local de départ:</label>
            <select id="typeLocalDepart" value={typeLocalDepart} onChange={(e) => setTypeLocalDepart(e.target.value)} required>
              <option value="">Sélectionner</option>
              <option value="Villa">Villa</option>
              <option value="Appartement">Appartement</option>
              <option value="Maison individuelle">Maison individuelle</option>
              <option value="Duplex">Duplex</option>
              <option value="Studio">Studio</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Ferme">Ferme</option>
              <option value="Maison de campagne">Maison de campagne</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="typeLocalArrivee"> <BsFillHouseDownFill /> Type de votre local d'arrivée:</label>
            <select id="typeLocalArrivee" value={typeLocalArrivee} onChange={(e) => setTypeLocalArrivee(e.target.value)} required>
              <option value="">Sélectionner</option>
              <option value="Villa">Villa</option>
              <option value="Appartement">Appartement</option>
              <option value="Maison individuelle">Maison individuelle</option>
              <option value="Duplex">Duplex</option>
              <option value="Studio">Studio</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Bungalow">Bungalow</option>
              <option value="Ferme">Ferme</option>
              <option value="Maison de campagne">Maison de campagne</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="ascenseurDepart"> <PiElevator /> Votre local de départ contient-il un ascenseur ?</label>
            <select id="ascenseurDepart" value={ascenseurDepart} onChange={(e) => setAscenseurDepart(e.target.value)} required>
              <option value="">Sélectionner</option>
              <option value="OUI">OUI</option>
              <option value="NON">NON</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="ascenseurArrivee"><PiElevator /> Votre local d'arrivée contient-il un ascenseur ?</label>
            <select id="ascenseurArrivee" value={ascenseurArrivee} onChange={(e) => setAscenseurArrivee(e.target.value)} required>
              <option value="">Sélectionner</option>
              <option value="OUI">OUI</option>
              <option value="NON">NON</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="etageMeubles"> <MdApartment /> A quel étage se trouvent les meubles?</label>
            <select id="etageMeubles" value={etageMeubles} onChange={(e) => setEtageMeubles(e.target.value)} required>
              <option value="">Sélectionner</option>
              <option value="Rez-de-chaussée">Rez-de-chaussée</option>
              <option value="Premier étage">Premier étage</option>
              <option value="Deuxième étage">Deuxième étage</option>
              <option value="Troisième étage ou plus">Troisième étage ou plus</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="etageSouhaite"> <MdApartment /> A quel étage souhaitez-vous déplacer les meubles?</label>
            <select id="etageSouhaite" value={etageSouhaite} onChange={(e) => setEtageSouhaite(e.target.value)} required>
              <option value="">Sélectionner</option>
              <option value="Rez-de-chaussée">Rez-de-chaussée</option>
              <option value="Premier étage">Premier étage</option>
              <option value="Deuxième étage">Deuxième étage</option>
              <option value="Troisième étage ou plus">Troisième étage ou plus</option>
            </select>
          </div>
          <div className="input-container">
            <label htmlFor="lieuDepart"> <FaHouseUser /> Entrer votre lieu de départ:</label>
            <input type="text" id="lieuDepart" value={lieuDepart} onChange={(e) => setLieuDepart(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="lieuArrivee"> <FaHouseCircleCheck /> Entrer votre lieu d'arrivée:</label>
            <input type="text" id="lieuArrivee" value={lieuArrivee} onChange={(e) => setLieuArrivee(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="dateDemenagement"> <FaCalendarAlt /> Tapez la date qui vous convient:</label>
            <input type="date" id="dateDemenagement" value={dateDemenagement} onChange={(e) => setDateDemenagement(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="heureDemenagement"> <TbClockHour4 /> Tapez l'heure qui vous convient:</label>
            <input type="time" id="heureDemenagement" value={heureDemenagement} onChange={(e) => setHeureDemenagement(e.target.value)} required />
          </div>
          <div className="input-container">
            <label htmlFor="telephone"> <FaPhoneAlt /> Tapez votre numéro de téléphone:</label>
            <input type="number" id="telephone" value={telephone} onChange={(e) => setTelephone(e.target.value)} required />
          </div>
          <button type="submit" className="btnn">Envoyer</button>
        </div>
      </div>
    </form>
  );
}

export default DemandeDemenagements;
