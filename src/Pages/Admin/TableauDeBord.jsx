import React from 'react';
import { Link } from 'react-router-dom'; 
import imgliv from '../../Assets/liv.svg';
import imgEnterprise from '../../Assets/imgEnterprise.svg';
function TableauDeBord() {
  return (
    <div className="container">
      <div className="box box-left"> 
        <img src={imgliv} alt="livreur" className="livreur-image" />
        <h2 className="title1">Cliquer ici pour creer un compte livreur</h2>
        <Link to="/admin/dashboard/add-livreur">
          <button className="button">Commencer</button>
        </Link>
      </div>
      <div className="box box-right"> 
        <img src={imgEnterprise} alt="entreprise" className="entreprise-image" />
        <h2 className="title2">Cliquer ici pour creer un compte Entreprise</h2>
        <Link to="/admin/dashboard/add-entreprise">
          <button className="button">Commencer</button>
        </Link>
      </div>
    </div>
  );
}

export default TableauDeBord;
