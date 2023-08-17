import React, { useEffect } from 'react';
import UserItem from './UserItem';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../store/usersSlice';

const UsersList = () => {
  const { users, error, loading } = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      {error ? (
        <div>
          <h3>Something went wrong!</h3>
          <h4>{ error }</h4>
        </div>
      ) : (
        <ul className="list">
          {loading && <h3>Loading...</h3>}
          {users.map(user => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </>
  )
}

export default UsersList