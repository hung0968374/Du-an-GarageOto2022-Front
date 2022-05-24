import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ClientInfoAttributes, WishList } from '../../types/auth';

export interface ClientDetailAttributes extends ClientInfoAttributes {
  id: number;
  userId: number;
  safeDeleteWishList: number[];
}

const initialState: ClientDetailAttributes = {
  id: 0,
  userId: 0,
  firstName: '',
  lastName: '',
  gender: '',
  phoneNumber: '',
  dob: '',
  addressCountry: '',
  addressProvince: '',
  addressDistrict: '',
  addressWard: '',
  addressDetail: '',
  timezone: '',
  stripeCustomerId: '',
  avatar: '',
  coupons: [],
  wishlist: [],
  safeDeleteWishList: [],
};

export const UserSlice = createSlice({
  name: 'clientInfo',
  initialState,
  reducers: {
    setClientRelatedInfo: (state: ClientDetailAttributes, action: PayloadAction<ClientInfoAttributes>) => {
      return { ...state, ...action.payload };
    },
    setKeyInfo: (state: ClientDetailAttributes, action: PayloadAction<{ id: number; userId: number }>) => {
      const { id, userId } = action.payload;
      return { ...state, id, userId };
    },
    setWishList: (state: ClientDetailAttributes, action: PayloadAction<WishList[]>) => {
      state.wishlist = action.payload;
    },
    resetEmpty: (state: ClientDetailAttributes) => {
      state.wishlist = [];
    },
    adjustList: (state: ClientDetailAttributes) => {
      const { safeDeleteWishList, wishlist } = state;
      if (safeDeleteWishList.length !== 0) {
        safeDeleteWishList.forEach((itemToDelete) => {
          const index = wishlist.findIndex((item) => item.carId === itemToDelete);
          wishlist.splice(index, 1);
        });
      }
    },
    setSafeDeleteList: (state: ClientDetailAttributes, action: PayloadAction<WishList>) => {
      state.safeDeleteWishList.push(action.payload.carId);
    },
    resetSafeDeleteList: (state: ClientDetailAttributes) => {
      state.safeDeleteWishList = [];
    },
  },
});

export const {
  setClientRelatedInfo,
  setKeyInfo,
  setWishList,
  resetEmpty,
  adjustList,
  setSafeDeleteList,
  resetSafeDeleteList,
} = UserSlice.actions;

export default UserSlice.reducer;
