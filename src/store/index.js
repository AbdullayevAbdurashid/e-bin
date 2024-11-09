// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import binsReducer from './binsSlice';
import promotionsReducer from './promotionsSlice';

export const store = configureStore({
  reducer: {
    bins: binsReducer,
    promotions: promotionsReducer,
  },
});