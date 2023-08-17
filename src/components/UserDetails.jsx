import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser, cleanOneUser, deleteUser } from '../store/usersSlice';

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { oneUser } = useSelector(state => state.users);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneUser(id));
    return () => dispatch(cleanOneUser());
  }, []);

  return (
    <>
      {oneUser ? (
        <div className="profile__card">
          <p>Name: { oneUser.name }</p>
          <p>Position: { oneUser.position }</p>
          <p>Expirience: { oneUser.expirience }</p>
          <button className="edit__btn" onClick={() => navigate(`/edit/${oneUser.id}`)}>Edit</button>
          <button className="delete__btn" onClick={() => {
            dispatch(deleteUser(oneUser.id));
            navigate('/');
          }}>Delete</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  )
}

export default UserDetails