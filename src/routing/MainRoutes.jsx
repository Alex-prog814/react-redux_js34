import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UsersList from '../components/UsersList';
import UserCreate from '../components/UserCreate';
import UserEdit from '../components/UserEdit';
import UserDetails from '../components/UserDetails';

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="/details/:id" element={<UserDetails />} />
    </Routes>
  )
}

export default MainRoutes