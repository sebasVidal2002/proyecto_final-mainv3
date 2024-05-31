import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminView from './components/AdminView';
import Login from './components/Login';
import Register from './components/Register';
import ListaTorneos from './components/ListaTorneos';
import CrearTorneo from './components/CrearTorneo';



export const AppRouter = ({ correoUser, role }) => {
  return (
    <Routes>
      <Route path="/" element={correoUser ? (role === 'admin' ? <AdminView correoUser={correoUser} /> : <ListaTorneo correoUser={correoUser} />) : <Login />} />
      <Route path="/user" element={<ListaTorneos correoUser={correoUser} />} />
      <Route path="/admin" element={<AdminView correoUser={correoUser} />} />
      <Route path="/crear" element={<CrearTorneo correoUser={correoUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
