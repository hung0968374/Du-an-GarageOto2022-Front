import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AuthenticationStatus } from '../types/auth';

interface LoginParams {
  email: string;
  password: string;
}

export interface LoginReturn {
  loginMessage: string | null;
  loginStatus: number | null;
  userInfo?: unknown;
}

export interface LoginRejectReturn extends LoginReturn {}

export interface LoginInitialState extends LoginReturn {
  isLoggingIn: boolean;
  status: AuthenticationStatus;
}

const initialState: LoginInitialState = {
  isLoggingIn: false,
  loginMessage: null,
  loginStatus: null,
  status: AuthenticationStatus.UnAuthorized,
  userInfo: {},
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state: LoginInitialState, _action: PayloadAction<LoginParams>) => {
      state.isLoggingIn = true;
    },
    loginSuccess: (state: LoginInitialState, action: PayloadAction<LoginReturn>) => {
      state.isLoggingIn = false;
      state.loginMessage = action.payload.loginMessage;
      state.status = AuthenticationStatus.Authorized;
      state.loginStatus = action.payload.loginStatus;
      state.userInfo = action.payload.userInfo;
    },
    loginReject: (state: LoginInitialState, action: PayloadAction<LoginReturn>) => {
      state.isLoggingIn = false;
      state.loginMessage = action.payload.loginMessage;
      state.status = AuthenticationStatus.UnAuthorized;
      state.loginStatus = action.payload.loginStatus;
    },
    logOut: (state: LoginInitialState) => {
      state.isLoggingIn = false;
      state.loginMessage = '';
      state.status = AuthenticationStatus.UnAuthorized;
    },
    reset: (state: LoginInitialState) => {
      state.isLoggingIn = false;
      state.loginMessage = '';
      state.loginStatus = null;
    },
  },
});

export const { login, logOut, loginReject, loginSuccess, reset } = loginSlice.actions;

export default loginSlice.reducer;
