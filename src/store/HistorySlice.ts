import {createSlice} from '@reduxjs/toolkit';
import {Gif} from '../models/Models';

const initialState = {
  visited: [] as Gif[],
};

const HistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory: (state, action) => {
      const {gif} = action.payload;
      const index = state.visited.findIndex(g => g.id === gif.id);
      if (index !== -1) state.visited.splice(index, 1);
      state.visited.unshift(gif as Gif);
    },
  },
});

export const {addToHistory} = HistorySlice.actions;

export const historyReducer = HistorySlice.reducer;
