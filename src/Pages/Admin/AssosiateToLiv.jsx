import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function AssosiateToLiv() {
    const [livreurs, setLivreurs] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredLivreurs, setFilteredLivreurs] = useState([]);
    const [selectedLivId, setSelectedLivId] = useState("");
    const { id } = useParams();

    // Fetch all livreurs from the server once on component mount
    useEffect(() => {
        const fetchAllLivreurs = async () => {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/get-all-livs`,
                { token: localStorage.getItem("AdminToken") }
            );
            setLivreurs(res.data);
            setFilteredLivreurs(res.data); // Initialize the filtered list
        };

        fetchAllLivreurs();
    }, []);

    // Function to update the filtered list of livreurs based on the search query
    const handleSearch = (e) => {
        setQuery(e.target.value);

        const filtered = livreurs.filter((liv) =>
            liv.nom.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredLivreurs(filtered);
    };

    // Function to associate an action with a selected livreur
    const associateToLivreur = async () => {
        if (!selectedLivId) {
            console.error("No livreur selected!");
            return;
        }

        try {
            await axios.post(
                `${process.env.REACT_APP_API_URL}/admin/associateActionToLivreur/${selectedLivId}/${id}`
            );
            console.log("Associated successfully!");
            // Redirect to the dashboard
            window.location.href = "/admin/dashboard";
        } catch (error) {
            console.error("Error associating with livreur:", error);
        }
    };

    return (
        <div className="AssosiateToLivPage">
            <div className="selectLivSection">
                <div className="searchBarHolder">
                    <input
                        type="text"
                        placeholder="Rechercher par nom du livreur"
                        value={query}
                        onChange={handleSearch} // Use the updated search function
                    />
                </div>
                <div className="livHolder">
                    {filteredLivreurs.map((liv, index) => (
                        <div
                            key={index}
                            className={`livHolderItem ${selectedLivId === liv._id ? "selectedLiv" : ""}`}
                            onClick={() => setSelectedLivId(liv._id)} // Set the selected livreur ID
                        >
                            {liv.nom} {/* Display the livreur's name */}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={associateToLivreur}>Associer à ce livreur</button>
            <Link to="/admin/dashboard">Retour au tableau de bord</Link>
        </div>
    );
}

export default AssosiateToLiv;
