import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../credenciales';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';


const CrearTorneo =()=>{

    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(null);
    const [newTournament, setNewTournament] = useState({
      nombre: '',
      fecha_limite_inscripcion: '',
      img: '',
      cantidad_max_participantes: '',
      registrados: '',
    });
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const uploadFile = () => {
        const nombre = new Date().getTime() + file.nombre;
        const storageRef = ref(storage, nombre);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            switch (snapshot.state) {
              case 'paused':
                console.log('La carga está pausada');
                break;
              case 'running':
                console.log('La carga está en ejecución');
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setNewTournament((prev) => ({ ...prev, img: downloadURL }));
            });
          }
        );
      };
      if (file) {
        uploadFile();
      }
    }, [file]);
  
    const handleCreateDocument = async (event) => {
      event.preventDefault();
      const newId = `torneo-${Date.now()}`;
      await createDocument('torneo', newId, newTournament);
      navigate('/admin'); // Redirige a la página de admin después de crear el torneo
    };
  
    const handleChange = (event) => {
      const { nombre, value } = event.target;
      setNewTournament((prev) => ({
        ...prev,
        [nombre]: value,
      }));
    };
  
    const handleBack = () => {
      navigate('/admin');
    };
  
    return (
      <div className="torneo-detail">
        <nav className="navbar">
          <button className="btn-back btn-create" onClick={handleBack}>Volver al Menú</button>
        </nav>
        <form className="form-torneo" onSubmit={handleCreateDocument}>
          <h2>Crear Nuevo Torneo</h2>
          <div className='form-group'>
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={newTournament.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="date"
              placeholder="Fecha"
              value={newTournament.fecha_limite_inscripcion}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="maxParticipants"
              placeholder="Participantes Máximos"
              value={newTournament.cantidad_max_participantes}
              onChange={handleChange}
            />
            <input
              type="number"
              name="registered"
              placeholder="Registrados"
              value={newTournament.registrados}
              onChange={handleChange}
            />
            <input
              type="file"
              name="img"
              placeholder="Agrega una imagen"
              onChange={(event) => setFile(event.target.files[0])}
            />
          </div>
          <button className="btn-create" type="submit" disabled={progress !== null && progress < 100}>
            Crear Nuevo Torneo
          </button>
        </form>
      </div>
    );
 };
export default CrearTorneo;
