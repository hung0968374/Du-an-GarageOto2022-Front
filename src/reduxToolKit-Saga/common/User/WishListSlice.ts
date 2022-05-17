import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { WishList } from '../../types/auth';

export interface WishListState {
  list: WishList[];
}

const initialState: WishListState = {
  list: [],
};

export const WishListSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    setWishList: (state: WishListState, action: PayloadAction<WishList[]>) => {
      state.list = action.payload;
    },
    resetEmpty: (state: WishListState) => {
      state.list = [];
    },
    adjustList: (state: WishListState, action: PayloadAction<WishList>) => {
      const { list } = state;
      const index = list.findIndex((each) => action.payload.cars.name.trim() === each.cars.name.trim());
      if (index !== -1) {
        list.splice(index, 1);
      } else {
        list.push(action.payload);
      }
    },
  },
});

export const { setWishList, resetEmpty, adjustList } = WishListSlice.actions;

export default WishListSlice.reducer;
