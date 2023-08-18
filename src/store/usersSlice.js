import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8000/users';
const FAVORITES_API = 'http://localhost:8000/favorites';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async () => {
        let res = await axios.get(API);
        return res.data;
    }
);

export const createUser = createAsyncThunk(
    'users/createUser',
    async (newUserObj, { dispatch }) => {
        await axios.post(API, newUserObj);
        dispatch(getUsers());
    }
);

export const getOneUser = createAsyncThunk(
    'user/getOneUser',
    async (id) => {
        let { data } = await axios.get(`${API}/${id}`);
        return data;
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteUser',
    async (id, { dispatch }) => {
        await axios.delete(`${API}/${id}`);
        dispatch(getUsers());
    }
);

export const saveChanges = createAsyncThunk(
    'users/saveChanges',
    async (updatedUserObj, { dispatch }) => {
        await axios.patch(`${API}/${updatedUserObj.id}`, updatedUserObj);
        dispatch(getUsers());
    }
);

export const addToFavorites = createAsyncThunk(
    'users/addToFavorites',
    async (updatedUserObj, { dispatch }) => {
        if(updatedUserObj.favorites) {
            let favoriteObj = {
                id: `favorite-${updatedUserObj.id}`,
                user: updatedUserObj
            };
            await axios.post(FAVORITES_API, favoriteObj);
        } else {
            await axios.delete(`${FAVORITES_API}/favorite-${updatedUserObj.id}`);
        };
        await dispatch(saveChanges(updatedUserObj));
        dispatch(getFavorites());
    }
);

export const getFavorites = createAsyncThunk(
    'users/getFavorites',
    async () => {
        let { data } = await axios.get(FAVORITES_API);
        return data;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        favorites: [],
        oneUser: null,
        loading: false,
        error: null
    },
    reducers: {
        cleanOneUser: (state, action) => {
            state.oneUser = null;
        }
    },
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        [getUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.loading = false;
        },
        [getUsers.rejected]: (state, action) => {
            state.error = action.error.name;
            state.loading = false;
        },
        [getOneUser.fulfilled]: (state, action) => {
            state.oneUser = action.payload;
        },
        [getFavorites.fulfilled]: (state, action) => {
            state.favorites = action.payload;
        }
    }
});

export const { cleanOneUser } = usersSlice.actions;
export default usersSlice.reducer;