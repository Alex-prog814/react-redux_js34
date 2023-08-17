import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser, cleanOneUser } from '../store/usersSlice';

const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { oneUser } = useSelector(state => state.users);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOneUser(id));
    // return dispatch(cleanOneUser());
  }, []);

  console.log(oneUser);

  return (
    <>
      {oneUser ? (
        <div>
          <p>Name: { oneUser.name }</p>
          <p>Position: { oneUser.position }</p>
          <p>Expirience: { oneUser.expirience }</p>
          <button onClick={() => navigate(`/edit/${oneUser.id}`)}>Edit</button>
          <button>Delete</button>
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  )
}

export default UserDetails