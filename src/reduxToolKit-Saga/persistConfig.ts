import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';
import WishListSlice from './common/User/WishListSlice';
import GeneralSlice from './common/General/GeneralSlice';

const authPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'auth',
  storage,
};

const counterPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'counter',
  storage,
};

const wishlistPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'wishlist',
  storage,
};

const generalPersistConfig: PersistConfig<any, unknown, unknown, unknown> = {
  key: 'general',
  blacklist: ['scrollTopDisplay', 'scrollBarDisplay', 'loading', 'openSnackBar'],
  storage,
};

export default {
  counter: persistReducer(counterPersistConfig, counterSlice),
  login: persistReducer(authPersistConfig, loginSlice),
  wishlist: persistReducer(wishlistPersistConfig, WishListSlice),
  general: persistReducer(generalPersistConfig, GeneralSlice),
};
