import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    try {
      const response = await fetch('https://674938f25801f5153593538c.mockapi.io/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error al crear el usuario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Crear Usuario</h1>
      <label>Nombre: </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Introduce el nombre"
        required
      />
      <br />
      <label>Email: </label>
      <input
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Introduce el email"
        required
      />
      <br />
      <button type="submit">Crear</button>
    </form>
  );
};

export default UserForm;
