import createSagaMiddleware from '@redux-saga/core';
import { persistStore } from 'redux-persist';
import { combineReducers, configureStore, Reducer, Store } from '@reduxjs/toolkit';

import env, { Environment } from '../common/config/interface/env';

import rootSaga from './rootSaga';
import persistConfig, { baseItemsSlice } from './persistConfig';
import CounterSlice from './common/Counter/CounterSlice';
import loginSlice from './auth/LoginSlice';
import GeneralSlice from './common/General/GeneralSlice';
import ClientSlice from './common/User/ClientSlice';

const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  counter: CounterSlice,
  login: loginSlice,
  general: GeneralSlice,
  clientInfo: ClientSlice,
  baseItemInfos: baseItemsSlice,
});

export const store: Store = configureStore({
  reducer: combineReducers(persistConfig) as Reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: env.environment === Environment.Production ? false : true,
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof combinedReducer>;
export type AppDispatch = typeof store.dispatch;
