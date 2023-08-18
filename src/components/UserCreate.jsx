import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../store/usersSlice'; 
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const [user, setUser] = useState({
    name: '',
    position: '',
    expirience: ''
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function addUser() {
    for(let key in user) {
      if(!user[key]) return alert('Some inputs are empty!');
    };

    dispatch(createUser({ ...user, favorites: false }));
    navigate('/');
  };

  return (
    <div className="create__block">
      <h2>Create User</h2>

      <input type="text" placeholder="Name" onChange={e => setUser({ ...user, name: e.target.value })} value={user.name} />

      <input type="text" placeholder="Position" onChange={e => setUser({ ...user, position: e.target.value })} value={user.position} />

      <input type="text" placeholder="Expirience" onChange={e => setUser({ ...user, expirience: e.target.value })} value={user.expirience} />

      <button className="create__btn" onClick={addUser}>Create</button>
    </div>
  )
}

export default UserCreate