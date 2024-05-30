import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import './App.css';
import appFirebase from './credenciales';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRouter } from './AppRouter';




const auth = getAuth(appFirebase);
const firestore = getFirestore(appFirebase);

function App() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getRole(uid) {
        try {
            const docuRef = doc(firestore, `user/${uid}`);
            const docuCifrada = await getDoc(docuRef);
            if (docuCifrada.exists()) {
                const infoFinal = docuCifrada.data().role;
                return infoFinal;
            } else {
                console.error("Documento no encontrado.");
                return null;
            }
        } catch (error) {
            console.error("Error al obtener el rol del usuario:", error);
            return null;
        }
    }
    

    function setUserWithFirebaseAndRol(userFirebase) {
        getRole(userFirebase.uid).then((role) => {
        const usuarioData = {
            uid: userFirebase.uid,
            email: userFirebase.email,
            role: role,
        };
        setUsuario(usuarioData);
        setLoading(false);
        console.log("Usuario registrado", usuarioData);
        }).catch((error) => {
        console.error("Error al obtener el rol del usuario:", error);
        setLoading(false);
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userFirebase) => {
        if (userFirebase) {
            setUserWithFirebaseAndRol(userFirebase);
        } else {
            setUsuario(null);
            setLoading(false);
        }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    
    return (
        <Router>
        <div>
          <AppRouter correoUser={usuario?.email} role={usuario?.role} />
        </div>
        </Router>
        
    );
}

export default App;
