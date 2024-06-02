import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apropos from "../Assets/apropos.svg"; 
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { IoIosMailUnread } from "react-icons/io";
import { HiOutlineTruck } from "react-icons/hi2"; 
import { BsBoxSeam } from "react-icons/bs"; 

const Home = () => {
  const navigate = useNavigate(); 
  const contentSectionRef = useRef(null); 
  const aboutSectionRef = useRef(null); 
  const contactSectionRef = useRef(null); 
  const servicesSectionRef = useRef(null); // Référence à la section "Nos services"

  const handleScrollToContent = () => {
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    if (contactSectionRef.current) {
      contactSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToServices = () => { // Fonction pour naviguer à la section "Nos services"
    if (servicesSectionRef.current) {
      servicesSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-container">
      {/* Barre de navigation fixe */}
      <div className="nav">
        {/* Côté gauche : Logo de l'entreprise */}
        <div className="nav-left">
          <img src={require("../Assets/logo1.png")} alt="Logo de la société" className="log" />
        </div>

        {/* Milieu : Liens de navigation */}
        <div className="nav-middle">
          <span onClick={handleScrollToContent}>Accueil</span> 
          <span onClick={handleScrollToAbout}>A-propos de nous</span> 
          <span onClick={handleScrollToServices}>Nos services</span> {/* Ajout de la fonction pour naviguer à "Nos services" */}
          <span onClick={handleScrollToContact}>Contact</span> 
        </div>

        {/* Côté droit : Boutons */}
        <div className="nav-right">
          <button onClick={() => navigate('/user/register')}>S'inscrire</button>
          <button onClick={() => navigate('/user/login')}>Se connecter</button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="contentn" ref={contentSectionRef}>
        <div className="main-content-left">
          <p className="bold-green">
            Livrez ce dont vous avez besoin<br />
            avec rapidité et confiance.
          </p>
          
          <button
            className="voir-plus-btn"
            onClick={handleScrollToAbout} 
          >
            Voir plus
          </button>
        </div>

        <div className="main-content-right">
          <img src={require("../Assets/Home.png")} alt="Home" className="home-image" />
        </div>
      </div>

      {/* Section "À PROPOS DE NOUS" avec image à gauche et texte à droite */}
      <div className="more-content" ref={aboutSectionRef} style={{padding: "0"}}>
        <div className="about-container" style={{padding : "0px" , marginBottom : "0.5em" ,  marginTop : "0.3em"}}>
          <div className="about-left">
            <h2 style={{fontSize : "2.5em" , marginBottom : "0.3em" , textTransform : "capitalize" }}>À PROPOS DE NOUS</h2>
            <p style={{textAlign : "justify" , fontSize : "1.2em"}}>
              Notre application révolutionnaire de livraison et de déménagement simplifie le processus tant pour les clients que pour les entreprises.
              Avec une gamme diversifiée de produits livrés à votre porte en un clin d'œil, nous rendons la vie quotidienne plus pratique que jamais.
              En plus, nous offrons également une assistance pour les déménagements, vous aidant à déplacer vos meubles en toute tranquillité.
              Avec notre engagement envers la qualité, la fiabilité, et la satisfaction du client, nous sommes là pour rendre chaque étape de votre expérience de livraison et de déménagement aussi fluide que possible.
            </p>
          </div>

          <div className="about-right">
            <img src={apropos} alt="Image à propos" />
          </div>
        </div>
      </div>

      {/* Nouvelle section "Nos services" */}
      <div className="services-section" ref={servicesSectionRef}> {/* Ajout de la référence à la section "Nos services" */}
        <h2>Nos Services</h2> 
        
        <div className="service-cards">
          {/* Première carte pour le service de livraison */}
          <div className="service-card">
            <div className="icon-container">
              <BsBoxSeam className="service-icon" />
            </div>
            <h3>Service de livraison</h3>
            <p>
              Profitez d'une expérience de livraison sans faille grâce à notre service rapide, fiable et pratique, qui vous permet de recevoir une gamme variée de produits directement à votre porte en un temps record.
            </p>
          </div>
          
          {/* Deuxième carte pour le service de déménagement */}
          <div className="service-card">
            <div className="icon-container">
              <HiOutlineTruck className="service-icon" />
            </div>
            <h3>Service de déménagement</h3>
            <p>
              Facilitez votre déménagement avec notre service professionnel, offrant une assistance experte pour déplacer vos meubles en toute sécurité, vous permettant ainsi de vous installer dans votre nouveau chez-vous en toute tranquillité d'esprit.
            </p>
          </div>
        </div>
      </div>

      {/* Section "Nous contacter" */}
      <div className="contact-section" ref={contactSectionRef}>
        <h2>Nous contacter</h2>
        <div className="contact-details">
          <div className="contact-item">
            <FaLocationDot className="contact-icon" />
            <p>35 Rue des Jasmins<br />2080 Ariana, Tunisie</p>
          </div>
          <div className="contact-item">
            <IoIosMailUnread className="contact-icon" />
            <p>wassali@gmail.com</p>
          </div>
          <div className="contact-item">
            <FaPhone className="contact-icon" />
            <p>+216 22 111 555</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
