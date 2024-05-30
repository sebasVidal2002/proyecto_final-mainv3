import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AdminView from './components/AdminView';
import ListaTorneos from './components/ListaTorneos';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';



export const AppRouter = ({ correoUser, role }) => {
  return (
    <Routes>
      <Route path="/" element={correoUser ? (role === 'admin' ? <AdminView correoUser={correoUser} /> : <ProductList correoUser={correoUser} />) : <Login />} />
      <Route path="/user" element={<ListaTorneos correoUser={correoUser} />} />
      <Route path="/admin" element={<AdminView correoUser={correoUser} />} />
      <Route path="/create" element={<ProductList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
