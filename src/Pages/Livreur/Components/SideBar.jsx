import React from 'react';
import { FaHouse } from "react-icons/fa6";
import { RiPagesLine } from "react-icons/ri";
import { FaTruck } from "react-icons/fa6";
import { GiBoxUnpacking } from "react-icons/gi";
import { MdOutlineHistory } from "react-icons/md";
import { Link } from 'react-router-dom';
const SideBar = () => {
    return (
        <div className="sidebar">
            <div className="logo">
            <img src={require("../../../Assets/logo1.png")} alt="Logo de la société" />
            </div>
            <div className="section">
                <div className="section-title">
                <FaHouse />
                    <span className="title-text">Tableau de bord</span>
                </div>
                
            </div>
            <div className="section">
                <div className="section-title">
                <RiPagesLine />
                    <span className="title-text">Pages</span>
                </div>
            
            </div>

            <div className="subsection">
                <GiBoxUnpacking />
                <Link to="demandes-dem" className="title-text" >Demandes demenagements</Link>
             </div>
            <div className="subsection">
                <GiBoxUnpacking />
                <Link to="demandes-livraisons-Liv" className="title-text" >Demandes livraisons</Link>
                
            </div>
            <div className="section">
                <div className="section-title">
                <MdOutlineHistory />
                    <span className="title-text">Historiques</span>
                </div>
             
            
            </div>
            
            <div className="subsection">
            <GiBoxUnpacking />
            <Link to="historique-livraisons" className="title-text" >livraisons</Link>
            </div>
            <div className="subsection">
            <GiBoxUnpacking />
            <Link to="historique-Dem" className="title-text" >Demenagements</Link>
            </div>
        </div>
    );
}

export default SideBar;
