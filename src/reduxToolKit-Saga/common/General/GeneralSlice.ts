import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Theme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export interface WishListState {
  loading: boolean;
  theme: Theme;
  carPaymentId: number;
  scrollBarDisplay: boolean;
  scrollTopDisplay: boolean;
  openSnackBar: boolean;
}

const initialState: WishListState = {
  loading: false,
  theme: Theme.DARK,
  carPaymentId: 0,
  scrollBarDisplay: true,
  scrollTopDisplay: false,
  openSnackBar: false,
};

export const GeneralSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLoading: (state: WishListState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTheme: (state: WishListState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setPaymentId: (state: WishListState, action: PayloadAction<number>) => {
      state.carPaymentId = action.payload;
    },
    setNavbarDisplay: (state: WishListState, action: PayloadAction<boolean>) => {
      state.scrollBarDisplay = action.payload;
    },
    setScrollTopDisplay: (state: WishListState, action: PayloadAction<boolean>) => {
      state.scrollTopDisplay = action.payload;
    },
    resetPaymentId: (state: WishListState) => {
      state.carPaymentId = 0;
    },
  },
});

export const { setLoading, setTheme, setPaymentId, resetPaymentId, setNavbarDisplay, setScrollTopDisplay } =
  GeneralSlice.actions;

export default GeneralSlice.reducer;
