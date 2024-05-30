import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function AddEntreprise() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/admin/create-entreprise`;
      const response = await axios.post(apiUrl, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        toast.success(' Vous Avez Cree Un compte entreprise avec succes  😊😊 !!', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });

        setName('');
        setEmail('');
        setPassword('');
        setErrorMessage('');

        setTimeout(() => navigate("/Admin/dashboard"), 5000); // Navigate to the admin dashboard after 5 seconds
      } else {
        throw new Error('Failed to create Entreprise');
      }
    } catch (error) {
      console.error('Error creating Entreprise:', error);
      setErrorMessage(error.message || 'Failed to create Entreprise');
    }
  };

  return (
    <div>
      <h2 className='Add Entreprise'>Ajouter une entreprise</h2>
      <form onSubmit={handleSubmit} className='add-entreprise'>
        <div>
          <label htmlFor="name">Nom:</label>
          <input className='inputs'
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            className='inputs'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input
            className='inputs'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter une entreprise</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default AddEntreprise;
