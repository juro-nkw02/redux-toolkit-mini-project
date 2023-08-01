import { GAME_URL } from '../../config/index.js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getLocalStorageService,
  removeLocalStorageService,
} from '../../services/LocalStorageService.js';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getUsers = createAsyncThunk(
  `${GAME_URL}/users`,
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${GAME_URL}/users`);
      if (response.status == 200) {
        return response.data;
      }

      return [];
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk(
  `${GAME_URL}/users/register`,
  async ({ payload, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${GAME_URL}/users`, payload);
      console.log(response);
      if (response.status == 201 || response.statusText == 'Created') {
        const response = await axios.get(`${GAME_URL}/users`);
        if (response.status == 200) {
          navigate('/login');
          toast.success('Registered successfully!');

          return response.data;
        }
      }

      return [];
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const auth = createSlice({
  name: 'auth',
  initialState: {
    users: [],
    authenticatedUser: getLocalStorageService(),
  },
  reducers: {
    login: (state, action) => {
      state.authenticatedUser = action.payload;
    },
    logout: (state) => {
      state.authenticatedUser = null;
      removeLocalStorageService();
      toast.success('Logged out successfully!');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log('Error getting the users.', state, action);
      })
      .addCase(register.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.log('Error registering the user.', state, action);
      });
  },
});

export const { login, logout } = auth.actions;

export default auth.reducer;
