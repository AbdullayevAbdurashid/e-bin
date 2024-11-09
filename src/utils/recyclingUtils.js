// src/utils/recyclingUtils.js
import { addPoints, addTransaction } from '../store/promotionsSlice';
import { updateBinFillLevel } from '../store/binsSlice';

export const handleRecycling = (binId, material, amount, dispatch) => {
  const pointsPerItem = {
    plastic: 10,
    metal: 15,
    paper: 5,
  };

  const points = pointsPerItem[material] || 0;
  const totalPoints = points * amount;

  dispatch(updateBinFillLevel({ id: binId, fillLevel: amount }));
  dispatch(addPoints(totalPoints));
  dispatch(addTransaction({
    binId,
    material,
    amount,
    points: totalPoints,
  }));
};