// src/store/promotionsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userPoints: 0,
  promotions: [
    {
      id: 1,
      title: 'Recycle Plastic Bottles',
      points: 10,
      description: 'Get Yandex Plus points for every plastic bottle recycled',
      type: 'plastic',
    },
    {
      id: 2,
      title: 'Metal Can Recycling',
      points: 15,
      description: 'Earn extra points for recycling metal cans',
      type: 'metal',
    },
  ],
  transactions: [],
};

const promotionsSlice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    addPoints: (state, action) => {
      state.userPoints += action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push({
        ...action.payload,
        timestamp: new Date().toISOString(),
      });
    },
  },
});

export const { addPoints, addTransaction } = promotionsSlice.actions;
export default promotionsSlice.reducer;