import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CarAppearance {
  car_id: number;
  exteriorReviewImgs: string;
  id: string;
  imgs: string;
  interiorReviewImgs: string;
  introImgs: string;
  newExteriorReviewImgs: string;
  newImgs: string;
  newInteriorReviewImgs: string;
  newIntroImgs: string;
}

export interface CarAttributes {
  amenityReview: string;
  brandId: number;
  capacity: string;
  carAppearance: CarAppearance;
  design: string;
  discountPercent: number;
  engine: string;
  exteriorReview: string;
  gear: string;
  id: number;
  interiorReview: string;
  introReview: string;
  name: string;
  price: string;
  safetyReview: string;
  seats: string;
  yearOfManufacture: string;
  [key: string]: any;
}
type CarInfos = {
  info: CarAttributes;
  relatedCars: any;
  relatedBlogs: any;
};
interface Cars {
  [key: number]: CarInfos;
}

export interface CarState {
  cars: Cars;
}

const initialState: CarState = {
  cars: {},
};

export const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarAttributes: (state: CarState, action: PayloadAction<Cars>) => {
      state.cars = { ...state.cars, ...action.payload };
    },
  },
});

export const { setCarAttributes } = carSlice.actions;

export default carSlice.reducer;
