import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function AssosiateToLiv() {
    const [livreurs, setLivreurs] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedLivId, setSelectedLivId] = useState("");
    const { id } = useParams();

    useEffect(() => {
        const fetchAllNotif = async () => {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/get-all-livs`, { token: localStorage.getItem("AdminToken") });
            setLivreurs(res.data);
        }
        fetchAllNotif();
    }, []);

    const search = async () => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/admin/search-livreurs?nom=${query}`, { token: localStorage.getItem("AdminToken") });
        setLivreurs(res.data);
    }

    const associateToLivreur = async () => {
        if (!selectedLivId) {
            console.error("No livreur selected!");
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/admin/associateActionToLivreur/${selectedLivId}/${id}`);
            console.log("Associated successfully!");
          
            window.location.href = '/admin/dashboard';
        } catch (error) {
            console.error("Error associating to livreur:", error);
        }
    };

    return (
        <div className='AssosiateToLivPage'>
            <div className='selectLivSection'>
                <div className='searchBarHolder'>
                    <input type='search' placeholder='type livreur name' value={query} onChange={(e) => setQuery(e.target.value)}></input>
                    <button onClick={search}>Search</button>
                </div>
                <div className='livHolder'>
                    {livreurs.map(liv => (
                        <div className={`livHolde ${selectedLivId === liv?._id ? "selectedLiv" : ""}`} onClick={() => setSelectedLivId(liv?._id)}>
                            {liv?.nom}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={associateToLivreur}>Associate To This Livreur</button>
            <Link to="/admin/dashboard">Go to Dashboard</Link>
        </div>
    );
}

export default AssosiateToLiv;
