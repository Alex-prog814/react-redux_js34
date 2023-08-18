import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      <Link to="/create">Create</Link>
    </div>
  )
}

export default Navbar