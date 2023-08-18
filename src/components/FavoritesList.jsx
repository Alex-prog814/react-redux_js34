import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavorites } from '../store/usersSlice';
import FavoritesItem from './FavoritesItem';

const FavoritesList = () => {
    const { favorites } = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFavorites());
    }, []);

  return (
    <>
        {favorites.length ? (
            <ul className="list">
                {favorites.map(favoriteObj => (
                    <FavoritesItem key={favoriteObj.id} favoriteObj={favoriteObj} />
                ))}
            </ul>
        ) : (
            <h3 className="favorites__title">No favorites now!</h3>
        )}
    </>
  )
}

export default FavoritesList