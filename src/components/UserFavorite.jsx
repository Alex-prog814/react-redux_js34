import React from 'react';
import { useDispatch } from 'react-redux';
import { addToFavorites } from '../store/usersSlice';

const UserFavorite = ({ user }) => {
    const dispatch = useDispatch();

  return (
    <>
        {user.favorites ? (
            <div onClick={() => dispatch(addToFavorites({ ...user, favorites: false }))}>
                <img src="https://static-00.iconduck.com/assets.00/white-heart-emoji-2048x2008-1l7jbme4.png" alt="error:(" width="20" height="20" />
            </div>
        ) : (
            <div onClick={() => dispatch(addToFavorites({ ...user, favorites: true }))}>
                <img src="https://icon-library.com/images/white-heart-icon/white-heart-icon-23.jpg " alt="error:(" width="20" height="20" />
            </div>
        )}
    </>
  )
}

export default UserFavorite