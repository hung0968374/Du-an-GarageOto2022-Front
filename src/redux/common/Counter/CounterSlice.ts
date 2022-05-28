import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface iCounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: iCounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state: iCounterState) => {
      state.value += 1;
    },
    decrement: (state: iCounterState) => {
      state.value -= 1;
    },
    incrementByAmount: (state: iCounterState, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    incrementSaga: (state: iCounterState) => {
      state.status = 'loading';
    },
    incrementSagaSuccess: (state: iCounterState, action: PayloadAction<number>) => {
      state.status = 'idle';
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, incrementSaga, incrementSagaSuccess } = counterSlice.actions;

export default counterSlice.reducer;
