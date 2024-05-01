
import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';
import genresSlice from './genresSlice';

export const store = configureStore({
  reducer: {
    home: homeSlice,
    genres: genresSlice,
  },
})