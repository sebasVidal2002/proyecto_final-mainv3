import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../credenciales';

const AdminView = () => {
  const { id } = useParams();
  const [torneo, setTorneo] = useState(null);
  const navigate = useNavigate();
  // const correoUser = "usuario@example.com"; // Asegúrate de definir correoUser

  useEffect(() => {
    const fetchTorneo = async () => {
      if (!id) {
        console.error("El ID no está definido");
        return;
      }

      try {
        const docRef = doc(db, 'torneo', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTorneo(docSnap.data());
        } else {
          console.log("No existe el documento!");
        }
      } catch (error) {
        console.error("Error al obtener el documento:", error);
      }
    };

    fetchTorneo();
  }, [id]);

  const handleInscripcion = async () => {
    const docRef = doc(db, 'torneo', id);
    try {
      await updateDoc(docRef, {
        registered: arrayUnion(correoUser)
      });
      setTorneo((prevTorneo) => ({
        ...prevTorneo,
        registered: [...prevTorneo.registered, correoUser]
      }));
    } catch (error) {
      console.error("Error al inscribirse:", error);
    }
  };

  const handleDesinscripcion = async () => {
    const docRef = doc(db, 'torneo', id);
    try {
      await updateDoc(docRef, {
        registered: arrayRemove(correoUser)
      });
      setTorneo((prevTorneo) => ({
        ...prevTorneo,
        registered: prevTorneo.registered.filter(user => user !== correoUser)
      }));
    } catch (error) {
      console.error("Error al desinscribirse:", error);
    }
  };

  const handleBack = () => {
    navigate('/user');
  };

  if (!torneo) return <div>Cargando...</div>;

  const isUserRegistered = torneo.registered.includes(correoUser);

  return (
    <div className="torneo-detail">
      <nav className="navbar">
        <button className="btn-back" onClick={handleBack}>Volver al Menú</button>
      </nav>
      <div className="card">
        <h1>{torneo.name}</h1>
        <p>Fecha: {torneo.date}</p>
        <p>Cantidad máxima de participantes: {torneo.maxParticipants}</p>
        <p>Registrados: {torneo.registered.length}</p>
        {isUserRegistered ? (
          <button className="btn-danger" onClick={handleDesinscripcion}>Desinscribirse</button>
        ) : (
          <button className="btn-create" onClick={handleInscripcion}>Inscribirse</button>
        )}
      </div>
    </div>
  );
};

export default AdminView;
