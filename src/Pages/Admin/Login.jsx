import React, { useState } from 'react';

const Login = () => {
  // State pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Fonction pour mettre à jour le state lors de la saisie de l'utilisateur
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    // Vous pouvez effectuer des actions supplémentaires ici, comme envoyer les données au serveur

    // Exemple : Affichage des données dans la console
    console.log('Données du formulaire :', formData);
  };

  return (
    <div>
      <h2>Connexion Admin</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mot de passe:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
