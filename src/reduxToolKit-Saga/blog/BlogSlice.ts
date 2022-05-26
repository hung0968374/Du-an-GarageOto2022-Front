import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BlogType {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BlogType = {
  value: 0,
  status: 'idle',
};

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    increment: (state: BlogType) => {
      state.value += 1;
    },
    decrement: (state: BlogType) => {
      state.value -= 1;
    },
    incrementByAmount: (state: BlogType, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    incrementSaga: (state: BlogType) => {
      state.status = 'loading';
    },
    incrementSagaSuccess: (state: BlogType, action: PayloadAction<number>) => {
      state.status = 'idle';
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount, incrementSaga, incrementSagaSuccess } = blogSlice.actions;

export default blogSlice.reducer;
