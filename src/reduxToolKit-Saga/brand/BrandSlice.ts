import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CarAttributes } from '../../pages/client/brandItem/brand';

interface BrandInfo {
  brandImg: string;
  descriptionImgs: string;
  descriptions: string;
  shortDescriptions: string;
  id: number;
  name: string;
}

interface BrandCars {
  brandName?: CarAttributes[];
}

export interface BrandState {
  brands: Array<BrandInfo>;
  cars: BrandCars;
}

const initialState: BrandState = {
  brands: [],
  cars: {},
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrandsInfos: (state: BrandState, action: PayloadAction<Array<BrandInfo>>) => {
      state.brands = action.payload;
    },
    setBrandCars: (state: BrandState, action: PayloadAction<BrandCars>) => {
      state.cars = { ...state.cars, ...action.payload };
    },
  },
});

export const { setBrandsInfos, setBrandCars } = brandSlice.actions;

export default brandSlice.reducer;
