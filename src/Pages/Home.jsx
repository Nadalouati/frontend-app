import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import apropos from "../Assets/apropos.svg"; // Importer l'image SVG

const Home = () => {
  const navigate = useNavigate(); // Pour naviguer vers différentes pages
  const contentSectionRef = useRef(null); // Référence à la section "contentn"
  const aboutSectionRef = useRef(null); // Référence à la section "À PROPOS DE NOUS"

  const handleScrollToContent = () => {
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: 'smooth' }); // Défilement fluide vers la section "contentn"
    }
  };

  const handleScrollToAbout = () => {
    if (aboutSectionRef.current) {
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth' }); // Défilement fluide vers la section "À-propos de nous"
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
          <span onClick={handleScrollToContent}>Accueil</span> {/* Naviguer à la section "contentn" */}
          <span onClick={handleScrollToAbout}>A-propos de nous</span> {/* Naviguer à la section "À-propos de nous" */}
          <span>Nos services</span>
          <span>Contact</span>
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
            onClick={handleScrollToAbout} // Défilement fluide vers "more-content"
          >
            Voir plus
          </button>
        </div>

        <div className="main-content-right">
          <img src={require("../Assets/Home.png")} alt="Home" className="home-image" />
        </div>
      </div>

      {/* Section "À PROPOS DE NOUS" avec image à gauche et texte à droite */}
      <div className="more-content" ref={aboutSectionRef}>
        <div className="about-container">
          {/* Partie gauche avec le titre et le paragraphe */}
          <div className="about-left">
            <h2>À PROPOS DE NOUS</h2>
            <p>
              Notre application révolutionnaire de livraison et de déménagement simplifie le processus tant pour les clients que pour les entreprises.
              Avec une gamme diversifiée de produits livrés à votre porte en un clin d'œil, nous rendons la vie quotidienne plus pratique que jamais.
              En plus, nous offrons également une assistance pour les déménagements, vous aidant à déplacer vos meubles en toute tranquillité.
              Avec notre engagement envers la qualité, la fiabilité, et la satisfaction du client, nous sommes là pour rendre chaque étape de votre expérience de livraison et de déménagement aussi fluide que possible.
            </p>
          </div>

          {/* Partie droite avec l'image */}
          <div className="about-right">
            <img src={apropos} alt="Image à propos" />
          </div>
        </div>
      </div>

      {/* Nouvelle section "Nos services" */}
      <div className="services-section">
        <h2>Nos services</h2> {/* Titre centré, en haut, en gras, de couleur bleu foncé */}
        
        <div className="service-cards">
          {/* Première carte pour le service de livraison */}
          <div className="service-card">
            <h3>Service de livraison</h3>
            <p>
              Profitez d'une expérience de livraison sans faille grâce à notre service rapide, fiable et pratique, qui vous permet de recevoir une gamme variée de produits directement à votre porte en un temps record.
            </p>
          </div>
          
          {/* Deuxième carte pour le service de déménagement */}
          <div className="service-card">
            <h3>Service de déménagement</h3>
            <p>
              Facilitez votre déménagement avec notre service professionnel, offrant une assistance experte pour déplacer vos meubles en toute sécurité, vous permettant ainsi de vous installer dans votre nouveau chez-vous en toute tranquillité d'esprit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
