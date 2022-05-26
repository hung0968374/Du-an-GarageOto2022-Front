import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BrandInfo {
  brandImg: string;
  descriptionImgs: string;
  descriptions: string;
  shortDescriptions: string;
  id: number;
  name: string;
}

export interface BrandState {
  brands: Array<BrandInfo>;
  brandDetails: Record<string, any>;
}

const initialState: BrandState = {
  brands: [],
  brandDetails: {},
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrandsInfos: (state: BrandState, action: PayloadAction<Array<BrandInfo>>) => {
      state.brands = action.payload;
    },
  },
});

export const { setBrandsInfos } = brandSlice.actions;

export default brandSlice.reducer;
