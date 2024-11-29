import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserDelete = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://674938f25801f5153593538c.mockapi.io/users/${id}`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleDelete = async () => {
    if (!user) {
      console.error('No se encontró el usuario.');
      return;
    }

    const confirmation = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (!confirmation) return; 

    try {
      const response = await fetch(`https://674938f25801f5153593538c.mockapi.io/users/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Usuario eliminado con éxito.');
        navigate('/');
      } else {
        console.error('Error al eliminar el usuario');
        alert('Hubo un error al intentar eliminar el usuario.');
      }
    } catch (error) {
      console.error('Error en la solicitud de eliminación:', error);
      alert('Hubo un error al intentar eliminar el usuario.');
    }
  };

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Eliminar Usuario</h1>
      <p>¿Estás seguro de que deseas eliminar a {user.name}?</p>
      <button onClick={handleDelete}>Eliminar</button>
    </div>
  );
};

export default UserDelete;
