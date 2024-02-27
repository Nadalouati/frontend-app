import React, { useState } from 'react';

const AddEntreprise = () => {
    const [formData, setFormData] = useState({
      email: '',
      password: '',
      name: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Vous pouvez envoyer les données du formulaire à votre backend ici
      console.log(formData);
      // Réinitialiser le formulaire si nécessaire
      setFormData({
        email: '',
        password: '',
        name: '',
      });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <br />

        <button type="submit">Envoyer</button>
      </form>
    );
  };   

export default AddEntreprise




