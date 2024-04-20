import React from 'react';
import { FaHouse } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
import { FaTruck } from "react-icons/fa6";
import { GiBoxUnpacking } from "react-icons/gi";
import { MdOutlineHistory } from "react-icons/md";
import { Link } from 'react-router-dom';
const SideBarAdmin = () => {
    return (
        <div className="sidebarAdmin">
            <div className="logo">
            <img src={require("../../../Assets/logo1.png")} alt="Logo de la société" />
            </div>
            <div className="section">
                <div className="section-title">
                <FaHouse />
                    <Link to="tableau-de-bord" className="title-text" >Tableau de bord</Link>
                </div>
                
            </div>
            <div className="section">
                <div className="section-title">
                <RiPagesLine />
                    <span className="title-text">Pages</span>
                </div>
            
            </div>
            <div className="subsection">
            <FaTruck />
            <Link to="demandes-demenagements-admin" className="title-text" >Demandes déménagements</Link>
                
            </div>
            <div className="subsection">
                <GiBoxUnpacking />
                <Link to="demandes-livraisons-admin" className="title-text" >Demandes livraisons</Link>
                
            </div>
            <div className="section">
                <div className="section-title">
                <MdOutlineHistory />
                    <span className="title-text">Historiques</span>
                </div>
             
            
            </div>
            <div className="subsection">
            <FaTruck />
            <Link to="historique-demenagements-admin" className="title-text" >demenagements</Link>
            </div>
            <div className="subsection">
            <GiBoxUnpacking />
            <Link to="historique-livraisons-admin" className="title-text" >livraisons</Link>
            </div>
        </div>
    );
}

export default SideBarAdmin;
