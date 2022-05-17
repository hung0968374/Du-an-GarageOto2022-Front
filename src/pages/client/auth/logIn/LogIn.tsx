import React, { useState } from 'react';
import { Checkbox, CircularProgress, FormControlLabel } from '@mui/material';
import { AirlineStops } from '@mui/icons-material/';
import { Formik as FormValidation } from 'formik';
import { Link } from 'react-router-dom';

import { AuthForm, ImageSide } from '../../../../components/AuthForm/AuthForm';
import Auth from '../../../../common/interfaces/Auth';
import './Login.scss';
import { routerPath } from '../../../../common/constants/routerPath';
import { CustomTextField, MuiButton, SubmitButtonStyle } from '../../../../components/MuiStyling/MuiStyling';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/ReduxHook';
import { AuthActionType } from '../../../../reduxToolKit-Saga/types/auth';

interface SignInObject {
  email: string;
  password: string;
}

interface LoginFormInitValue {
  email: string;
  password: string;
  storeUser: boolean;
}

export const LogIn: React.FC = () => {
  const [firstTime, setFirstTime] = useState(true);
  const dispatch = useAppDispatch();
  const loading = useAppSelector((globalState) => globalState.login.isLoggingIn);
  const message = useAppSelector((globalState) => globalState.login.loginMessage);
  const status = useAppSelector((globalState) => globalState.login.loginStatus);

  function submitLogin(params: LoginFormInitValue) {
    const signInInfo: SignInObject = {
      email: params.email.trim(),
      password: params.password.trim(),
    };
    dispatch({
      type: AuthActionType.LOGIN,
      payload: signInInfo,
    });
  }

  function renderError() {
    if (message !== '' && message !== null && status !== 200 && status !== null && firstTime !== true) {
      return <div className="error-box">{message}</div>;
    }
  }

  return (
    <AuthForm imageSide={ImageSide.LEFT}>
      <div className="login-container">
        <h1 className="login-heading">Sign In</h1>
        <div className="flex justify-center my-7">
          <div className="login-directly-wrapper ">
            <AirlineStops fontSize="small" />
          </div>
          <span className="my-auto opacity-80">Sign in directly</span>
        </div>
        <div className="separator flex justify-center ">
          <div className="layout-text">
            <span className="opacity-80">Or sign in with email</span>
          </div>
        </div>
        {renderError()}
        <FormValidation
          initialValues={{ email: '', password: '', storeUser: true }}
          validationSchema={Auth.clientLoginSchema}
          onSubmit={(values: LoginFormInitValue, { setSubmitting }) => {
            setFirstTime(false);
            submitLogin(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, touched, errors, values, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="login-form">
              <CustomTextField
                id="outlined-email"
                label="Username"
                type="text"
                variant="outlined"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: '2rem', marginTop: '1rem' }}
                placeholder="johndoe@hotmail.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <CustomTextField
                id="standard-password"
                label="Password"
                type="password"
                variant="outlined"
                value={values.password}
                name="password"
                style={{ marginBottom: '1rem' }}
                placeholder="lovelyMuffin"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
              <div className="flex justify-between mt-2 mb-2">
                <FormControlLabel
                  label="Remember me"
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={handleChange}
                      id="standard-storeUser"
                      value={values.storeUser}
                      name="storeUser"
                      style={{
                        color: '#191919',
                      }}
                    />
                  }
                />
                <Link to={routerPath.auth.PASSWORD_RECOVER} className="my-auto text-redirect">
                  Forgot password?
                </Link>
              </div>
              <MuiButton variant="contained" type="submit" disabled={loading} style={SubmitButtonStyle}>
                {loading === false ? 'Sign In' : <CircularProgress sx={{ color: '#fff', padding: '6px' }} />}
              </MuiButton>

              <div className="separator"></div>
              <div className="text-center mb-4 text-sm">
                <span className="opacity-80">Dont have an account?</span> {'   '}
                <Link to={routerPath.auth.SIGN_UP} className="text-redirect" color="#008c7a">
                  Sign up
                </Link>
              </div>
            </form>
          )}
        </FormValidation>
      </div>
    </AuthForm>
  );
};
