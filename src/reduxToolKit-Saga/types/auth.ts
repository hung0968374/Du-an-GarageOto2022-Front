import { AxiosResponse } from 'axios';

export interface LoginParams {
  email: string;
  password: string;
}

export enum UserStatus {
  INITIAL = 'INITIAL',
  ACTIVE = 'ACTIVE',
  ON_HOLD = 'ON-HOLD',
  SUSPEND = 'SUSPEND',
  INACTIVE = 'IN-ACTIVE',
}
export interface WishList {
  cars: {
    name: string;
    price: string;
    carAppearance: { imgs: string };
    brand: { name: string };
  };
  carId: number;
}

export interface Coupon {
  id: string;
  couponId: string;
  usedAt: string | Date;
}

export interface ClientInfoAttributes {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  dob: string;
  addressCountry: string;
  addressProvince: string;
  addressDistrict: string;
  addressWard: string;
  addressDetail: string;
  timezone: string;
  stripeCustomerId: string;
  avatar: string;
  coupons: Coupon[];
  wishlist: WishList[];
}

export interface User {
  roles: string;
  status: UserStatus;
  email: string;
  createdAt: string | Date;
  lastLoginTime: string | Date;
  info: ClientInfoAttributes;
}

interface ErrorResponseData {
  code: number;
  data: any;
  message: string;
  success: boolean;
}

export interface ErrorResponse<T> {
  status: number;
  statusText: string;
  data: T;
}

export enum AuthActionType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface ClientRequestAccessTokenReturn {
  statusCode: number;
  headers: {
    authorization: string;
  };
}

export enum AuthenticationStatus {
  Idle = 'Idle',
  UnAuthorized = 'Unauthorized',
  Authorized = 'Authorized',
}

export interface ProvinceAttributes {
  province_id: string;
  province_name: string;
  province_type: string;
}
export interface ProvinceList {
  results: ProvinceAttributes[];
}

export interface DistrictAttributes {
  district_id: string;
  district_name: string;
  district_type: string;
  province_id: string;
}
export interface DistrictList {
  results: DistrictAttributes[];
}

export interface WardAttributes {
  district_id: string;
  ward_id: string;
  ward_name: string;
  ward_type: string;
}
export interface WardList {
  results: WardAttributes[];
}

export interface UpdateClientInfoAttributes {
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  dob: string;
  country: string;
  province: string;
  district: string;
  ward: string;
  detail: string;
  timezone: string;
}

export interface PaymentReceipt {
  uuid: string;
  quantity: number;
  createdAt: string;
  car: {
    name: string;
    price: string;
    carAppearance: {
      imgs: string;
    };
    brand: {
      name: string;
    };
  };
}
export interface GetOneCarReturn {
  id: number;
  brandId: number;
  name: string;
  price: string;
  discountPercent: number;
  design: string;
  engine: string;
  gear: string;
  seats: string;
  capacity: string;
  yearOfManufacture: string;
  imgs: string;
  brand: string | null;
}

export type LoginErrorResponse = AxiosResponse<ErrorResponseData>;
export type UserSignUpErrorResponse = AxiosResponse<ErrorResponseData>;
export type UserPasswordRecoverResponse = AxiosResponse<ErrorResponseData>;
export type UserNewPasswordResponse = AxiosResponse<ErrorResponseData>;
export type InterceptorErrorResponse = AxiosResponse<ErrorResponseData>;
export type ClientRequestAccessToken = AxiosResponse<ClientRequestAccessTokenReturn>;
export type ClientInfo = AxiosResponse<User>;
export type ProvinceInfo = AxiosResponse<ProvinceList>;
export type DistrictInfo = AxiosResponse<DistrictList>;
export type WardInfo = AxiosResponse<WardList>;
export type PaymentInfo = AxiosResponse<PaymentReceipt[]>;
export type CarAttributes = AxiosResponse<GetOneCarReturn>;
