import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';
import GeneralSlice from './common/General/GeneralSlice';
import ClientSlice from './common/User/ClientSlice';

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

export default {
  counter: persistReducer(counterPersistConfig, counterSlice),
  login: persistReducer(authPersistConfig, loginSlice),
  general: persistReducer(generalPersistConfig, GeneralSlice),
  clientInfo: persistReducer(clientPersistConfig, ClientSlice),
};
