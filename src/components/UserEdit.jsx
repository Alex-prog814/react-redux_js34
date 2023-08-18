import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser, saveChanges, cleanOneUser } from '../store/usersSlice';

const UserEdit = () => {
  const { oneUser } = useSelector(state => state.users);
  const [user, setUser] = useState(oneUser);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUser(id));
    return () => dispatch(cleanOneUser());
  }, []);

  return (
    <>
      {user ? (
        <div className="edit__block">
        <h2>Edit User Form</h2>
  
        <input type="text" placeholder="Name" onChange={e => setUser({ ...user, name: e.target.value })} value={user.name} />
  
        <input type="text" placeholder="Position" onChange={e => setUser({ ...user, position: e.target.value })} value={user.position} />
  
        <input type="text" placeholder="Expirience" onChange={e => setUser({ ...user, expirience: e.target.value })} value={user.expirience} />
  
        <button className="edit__btn" onClick={() => {
          dispatch(saveChanges(user));
          navigate('/');
        }}>Save</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  )
}

export default UserEdit