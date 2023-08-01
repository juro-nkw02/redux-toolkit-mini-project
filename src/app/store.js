import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import gameReducer from '../features/game/gameSlice.js';
import { setupListeners } from '@reduxjs/toolkit/dist/query/index.js';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
});

setupListeners(store.dispatch);
