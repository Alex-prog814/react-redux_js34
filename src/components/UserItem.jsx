import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserItem = ({ user }) => {
  const navigate = useNavigate();

  return (
    <li className="list__item">
      <p>{ user.name }</p>
      <p>{ user.position }</p>
      <p>{ user.expirience }</p>
      <button className="details__btn" onClick={() => navigate(`/details/${user.id}`)}>Details</button>
    </li>
  )
}

export default UserItem