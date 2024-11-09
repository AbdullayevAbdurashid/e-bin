// src/store/binsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bins: [
    {
      id: 1,
      location: [55.751574, 37.573856],
      fillLevel: 75,
      type: 'Smart Bin',
      address: 'Example Street, 123',
      materials: ['plastic', 'metal', 'paper'],
      lastEmptied: '2024-01-08T10:30:00Z',
    },
    {
      id: 2,
      location: [55.755826, 37.617300],
      fillLevel: 45,
      type: 'Smart Bin',
      address: 'Sample Avenue, 456',
      materials: ['plastic', 'metal', 'paper'],
      lastEmptied: '2024-01-08T09:15:00Z',
    },
  ],
  status: 'idle',
  error: null,
};

const binsSlice = createSlice({
  name: 'bins',
  initialState,
  reducers: {
    updateBinFillLevel: (state, action) => {
      const { id, fillLevel } = action.payload;
      const bin = state.bins.find(bin => bin.id === id);
      if (bin) {
        bin.fillLevel = fillLevel;
      }
    },
    addRecyclingTransaction: (state, action) => {
      const { binId, material, amount } = action.payload;
      const bin = state.bins.find(bin => bin.id === binId);
      if (bin) {
        bin.fillLevel += amount;
      }
    },
  },
});

export const { updateBinFillLevel, addRecyclingTransaction } = binsSlice.actions;
export default binsSlice.reducer;