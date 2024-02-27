import React, { useState } from 'react';

const AddLivreur = () => {
  const [livreurData, setLivreurData] = useState({
    username: '',
    password: '',
    nom: '',
    prenom: '',
    numTelephone: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivreurData({
      ...livreurData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(livreurData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={livreurData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={livreurData.password} onChange={handleChange} />
      </label>
      <br />
      <label>
        Nom:
        <input type="text" name="nom" value={livreurData.nom} onChange={handleChange} />
      </label>
      <br />
      <label>
        Prénom:
        <input type="text" name="prenom" value={livreurData.prenom} onChange={handleChange} />
      </label>
      <br />
      <label>
        Numéro de téléphone:
        <input type="text" name="numTelephone" value={livreurData.numTelephone} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={livreurData.email} onChange={handleChange} />
      </label>
      <br />

      <button type="submit">Envoyer</button>
    </form>
  );
};

export default AddLivreur






  