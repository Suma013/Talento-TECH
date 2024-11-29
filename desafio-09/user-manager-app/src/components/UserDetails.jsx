import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const UserDetails = () => {
  const [user, setUser] = useState(null); 
  const { id } = useParams();

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
  }, [id])

  if (!user) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Detalles de Usuario</h1>
      <p>ID: {user.id}</p>
      <p>Nombre: {user.name}</p>
      <p>Email: {user.email}</p>
      <img src={user.avatar} alt="Avatar" />
      <div>
        <Link to={`/delete/${user.id}`}>Eliminar Usuario</Link>
        <br />
        <Link to={`/edit/${user.id}`}>Editar Usuario</Link>
        <br />
        <Link to="/">Volver</Link>
      </div>
    </div>
  );
};

export default UserDetails;
