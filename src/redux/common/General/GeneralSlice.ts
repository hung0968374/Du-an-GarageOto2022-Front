import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Theme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export interface GeneralState {
  loading: boolean;
  theme: Theme;
  carPaymentId: number;
  scrollBarDisplay: boolean;
  scrollTopDisplay: boolean;
  openSnackBar: boolean;
}

const initialState: GeneralState = {
  loading: false,
  theme: Theme.LIGHT,
  carPaymentId: 1,
  scrollBarDisplay: true,
  scrollTopDisplay: false,
  openSnackBar: false,
};

export const GeneralSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLoading: (state: GeneralState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTheme: (state: GeneralState, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },
    setPaymentId: (state: GeneralState, action: PayloadAction<number>) => {
      state.carPaymentId = action.payload;
    },
    setNavbarDisplay: (state: GeneralState, action: PayloadAction<boolean>) => {
      state.scrollBarDisplay = action.payload;
    },
    setScrollTopDisplay: (state: GeneralState, action: PayloadAction<boolean>) => {
      state.scrollTopDisplay = action.payload;
    },
    resetPaymentId: (state: GeneralState) => {
      state.carPaymentId = 0;
    },
  },
});

export const { setLoading, setTheme, setPaymentId, resetPaymentId, setNavbarDisplay, setScrollTopDisplay } =
  GeneralSlice.actions;

export default GeneralSlice.reducer;
