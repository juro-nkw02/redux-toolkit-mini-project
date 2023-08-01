import axios from 'axios';
import { toast } from 'react-toastify';
import { GAME_URL } from '../../config/index.js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getGames = createAsyncThunk(
  `${GAME_URL}/games`,
  async (url, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${GAME_URL}/games`);
      if (response.status == 200 || response.statusText == 'OK') {
        return response.data;
      }

      return [];
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const createGame = createAsyncThunk(
  `${GAME_URL}/games/create`,
  async ({ payload, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${GAME_URL}/games`, payload);

      if (response.status == 201 || response.statusText == 'Created') {
        const response = await axios.get(`${GAME_URL}/games`);
        if (response.status == 200) {
          navigate('/');
          toast.success('Game has been created successfully!');

          return response.data;
        }
      }

      return [];
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const updateGame = createAsyncThunk(
  `${GAME_URL}/games/edit`,
  async ({ payload, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${GAME_URL}/games/${payload.id}`,
        payload
      );
      if (response.status == 201 || response.statusText == 'OK') {
        const response = await axios.get(`${GAME_URL}/games`);
        if (response.status == 200) {
          navigate('/');
          toast.success('Game has been updated successfully!');

          return response.data;
        }
      }

      return [];
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const deleteGame = createAsyncThunk(
  `${GAME_URL}/games/delete`,
  async ({ payload }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${GAME_URL}/games/${payload.id}`);
      if (response.status == 200 || response.statusText == 'OK') {
        const response = await axios.get(`${GAME_URL}/games`);
        if (response.status == 200) {
          toast.success('Game has been removed successfully!');

          return response.data;
        }
      }

      return [];
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

const game = createSlice({
  name: 'game',
  initialState: {
    games: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGames.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(getGames.rejected, (state, action) => {
        console.log('Error getting the games.', state, action);
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(createGame.rejected, (state, action) => {
        console.log('Error creating the game.', state, action);
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(updateGame.rejected, (state, action) => {
        console.log('Error updating the game.', state, action);
      })
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(deleteGame.rejected, (state, action) => {
        console.log('Error deleting the game.', state, action);
      });
  },
});

export default game.reducer;
