import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import appFirebase from '../credenciales';

const auth = getAuth(appFirebase);

const Register = () => {
  const firestore = getFirestore(appFirebase);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Inicializa el estado del rol con 'user'
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const infoUser = await createUserWithEmailAndPassword(auth, email, password);
      if (infoUser.user) {
        console.log("Usuario registrado:", infoUser.user.uid);
        const docuRef = doc(firestore, `user/${infoUser.user.uid}`);
        await setDoc(docuRef, { correo: email, role: role });
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        navigate('/login');
      } else {
        throw new Error("El objeto de usuario no está definido.");
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("El correo electrónico ya está en uso. Por favor, usa otro correo o inicia sesión.");
      } else {
        console.error("Error al registrar el usuario:", error);
        alert("Error al registrar el usuario: " + error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirige al usuario después de iniciar sesión con Google
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  const redirectToLogin = (event) => {
    event.preventDefault();
    navigate('/login');
  };

  return (
    <div className="login-wrapper">
      <div className='containerRegister'>
        <div className="header">
          <h2>Registrar usuario</h2>
        </div>
        <form className='formRegister' onSubmit={handleRegister}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email'
              id='email'
              name='email'
              autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              id='password'
              name='password'
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>
              <span>Rol</span>
              <select id='role' name='role' value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Administrador</option>
                <option value="user">Usuario</option>
              </select>
            </label>
          </div>
          <button type='submit' className='btnRegister'>Registrarse</button>
        </form>
        <div className='registerLink'>
          ¿Ya tienes cuenta? <a href="#" onClick={redirectToLogin}>Iniciar Sesión</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
