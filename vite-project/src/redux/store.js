import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'; // Fixed import

export const store = configureStore({
  reducer: {
    user: userReducer
  },
});
