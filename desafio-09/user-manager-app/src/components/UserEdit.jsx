import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserEdit = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://674938f25801f5153593538c.mockapi.io/users/${id}`);
        const data = await response.json();
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleUpdate = async () => {
    if (!name || !email) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor, introduce un correo electrónico válido.');
      return;
    }

    try {
      const response = await fetch(`https://674938f25801f5153593538c.mockapi.io/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        navigate(`/users/${id}`);
      }
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  return (
    <div>
      <h1>Editar Usuario</h1>
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
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

export default UserEdit;
