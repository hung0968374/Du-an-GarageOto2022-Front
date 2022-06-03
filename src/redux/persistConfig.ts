import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import counterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';
import GeneralSlice from './common/General/GeneralSlice';
import ClientSlice from './common/User/ClientSlice';
import BlogSlice from './blog/BlogSlice';
import CarSlice from './car/CarSlice';
import brandSlice from './brand/BrandSlice';

const authPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'auth',
  storage,
};

const counterPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'counter',
  storage,
};

const generalPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'general',
  blacklist: ['scrollTopDisplay', 'scrollBarDisplay', 'loading', 'openSnackBar'],
  storage,
};

const clientPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'client',
  blacklist: ['safeDeleteWishList'],
  storage,
};

const baseItemInfosPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'baseItemInfos',
  storage,
};

export const baseItemsSlice = combineReducers({
  blog: BlogSlice,
  car: CarSlice,
  brand: brandSlice,
});

export default {
  counter: persistReducer(counterPersistConfig, counterSlice),
  login: persistReducer(authPersistConfig, loginSlice),
  general: persistReducer(generalPersistConfig, GeneralSlice),
  clientInfo: persistReducer(clientPersistConfig, ClientSlice),
  baseItemInfos: persistReducer(baseItemInfosPersistConfig, baseItemsSlice),
};
