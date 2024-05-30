import React from 'react';
import { Link } from 'react-router-dom'; 
import imgliv from '../../Assets/liv.svg';
import imgEnterprise2 from '../../Assets/imgEnterprise2.svg';
function TableauDeBord() {
  return (
    <div className="container" style={{height : "auto",marginTop:"3em"}}>
      <div className="box box-left"> 
        <img src={imgliv} alt="livreur" className="livreur-imagee" />
        <h2 className="title1">Cliquer ici pour creer un compte livreur</h2>
        <Link to="/admin/dashboard/add-livreur">
          <button className="button">Commencer</button>
        </Link>
      </div>
      <div className="box box-right"> 
        <img src={imgEnterprise2} alt="entreprise" className="entreprise-imagee" />
        <h2 className="title2">Cliquer ici pour creer un compte Entreprise</h2>
        <Link to="/admin/dashboard/add-entreprise">
          <button className="button">Commencer</button>
        </Link>
      </div>
    </div>
  );
}

export default TableauDeBord;
