import { all } from 'redux-saga/effects';

import LoginSaga from './auth/LoginSaga';
import CounterSaga from './common/Counter/CounterSaga';

export default function* rootSaga() {
  yield all([CounterSaga(), LoginSaga()]);
}
