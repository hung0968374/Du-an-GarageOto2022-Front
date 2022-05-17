import { Formik as FormValidation } from 'formik';
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { AlertColor, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

import './SignUp.scss';
import Auth, { UserRoles } from '../../../../common/interfaces/Auth';
import { AuthForm, ImageSide } from '../../../../components/AuthForm/AuthForm';
import env from '../../../../common/config/interface/env';
import { CustomTextField, MuiButton, SubmitButtonStyle } from '../../../../components/MuiStyling/MuiStyling';
import clientService from '../../../../services/clientService';
import { CustomSnackbar } from '../../../../components/Snackbar/CustomSnackbar';
import { UserSignUpErrorResponse } from '../../../../reduxToolKit-Saga/types/auth';
import { routerPath } from '../../../../common/constants/routerPath';
interface SignUpFormInitValue {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  reTypePassword?: string;
  gCaptcha: string;
  roles: UserRoles;
}

export const SignUp = () => {
  const captchaRef = React.useRef<any>();
  const [loading, setLoading] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [responseFromAPI, setResponseFromAPI] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState<AlertColor>();

  const signUpSubmit = async (signUpValues: SignUpFormInitValue) => {
    const gCaptcha: string = await captchaRef.current?.executeAsync();
    const signUpObj = { ...signUpValues, gCaptcha };
    delete signUpObj?.reTypePassword;

    try {
      setLoading(true);
      const response = await clientService.userSignUp(signUpObj);
      setSnackbarType('success');
      setResponseFromAPI(response);
      setShowSnackbar(true);
    } catch (error: any) {
      const resError: UserSignUpErrorResponse = error.response;
      setSnackbarType('error');
      setResponseFromAPI(resError?.data?.message);
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm imageSide={ImageSide.RIGHT}>
      <div className="sign_up-container">
        <h1 className="sign_up-heading">Sign Up</h1>

        <FormValidation
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            reTypePassword: '',
            gCaptcha: '',
            roles: UserRoles.CLIENT,
          }}
          validationSchema={Auth.clientSignUpSchema}
          onSubmit={async (values: SignUpFormInitValue, { setSubmitting }) => {
            await signUpSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, touched, errors, values, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="sign_up-form">
              <ReCAPTCHA
                ref={captchaRef}
                sitekey={env.captchaSiteKey}
                size="invisible"
                badge="bottomleft"
                theme="light"
              />

              <div className="sign_up-full_name">
                <CustomTextField
                  id="first-name"
                  className="first-name"
                  label="First name"
                  type="text"
                  variant="outlined"
                  value={values.firstName}
                  name="firstName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Arron"
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />

                <CustomTextField
                  id="last-name"
                  className="last-name"
                  label="Last name"
                  type="text"
                  variant="outlined"
                  value={values.lastName}
                  name="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Ramsey"
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </div>

              <CustomTextField
                id="outlined-email"
                label="Email"
                type="text"
                variant="outlined"
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ marginBottom: '1.5rem' }}
                placeholder="arronramsey@gmail.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <CustomTextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={values.password}
                name="password"
                style={{ marginBottom: '1.5rem' }}
                placeholder="ArronRamsey1234!@"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              <CustomTextField
                id="retype-password"
                label="Retype password"
                type="password"
                variant="outlined"
                value={values.reTypePassword}
                name="reTypePassword"
                style={{ marginBottom: '2rem' }}
                placeholder="ArronRamsey1234!@"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.reTypePassword && Boolean(errors.reTypePassword)}
                helperText={touched.reTypePassword && errors.reTypePassword}
              />

              <MuiButton variant="contained" type="submit" disabled={loading} style={SubmitButtonStyle}>
                {loading === false ? 'Sign up' : <CircularProgress sx={{ color: '#fff', padding: '6px' }} />}
              </MuiButton>

              <div className="separator"></div>
              <div className="text-center mb-4 text-sm">
                <span className="opacity-80">You have had an account?</span> {'   '}
                <Link to={routerPath.auth.LOG_IN} className="text-redirect" color="#008c7a">
                  Sign in
                </Link>
              </div>
            </form>
          )}
        </FormValidation>
      </div>

      <CustomSnackbar
        snackbarColor={snackbarType}
        res={responseFromAPI}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </AuthForm>
  );
};
