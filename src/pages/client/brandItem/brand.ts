export interface BrandItemAttributes {
  id: string;
  name: string;
  descriptions: string;
  shortDescriptions: string;
  brandImg: string;
  descriptionImgs: string;
}

export interface CarImgAttributes {
  introImgs: string;
  imgs: string;
}

export type RatingPointAttrs = {
  carId: number;
  id: number;
  ratingPoint: string;
  userId: number;
};

export interface CarAttributes {
  id: string;
  name: string;
  price: string;
  seat: string;
  carAppearance: CarImgAttributes;
  ratingPoints: RatingPointAttrs;
}

export interface BodyTypeAttributes {
  design: string;
}

export interface SeatAttributes {
  seats: string;
}
