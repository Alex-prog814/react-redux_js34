import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = 'http://localhost:8000/users';

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

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
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
        }
    }
});

export const { cleanOneUser } = usersSlice.actions;
export default usersSlice.reducer;