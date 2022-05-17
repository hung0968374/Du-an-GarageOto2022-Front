import React, { useState } from 'react';
import { Formik as FormValidation } from 'formik';
import { AlertColor, CircularProgress } from '@mui/material';

import './PasswordRecover.scss';
import { AuthForm, ImageSide } from '../../../../components/AuthForm/AuthForm';
import Auth from '../../../../common/interfaces/Auth';
import { CustomTextField, MuiButton, SubmitButtonStyle } from '../../../../components/MuiStyling/MuiStyling';
import { UserPasswordRecoverResponse } from '../../../../reduxToolKit-Saga/types/auth';
import clientService from '../../../../services/clientService';
import { CustomSnackbar } from '../../../../components/Snackbar/CustomSnackbar';
interface PasswordRecoverInitValue {
  email: string;
}

export const PasswordRecover: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [responseFromAPI, setResponseFromAPI] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState<AlertColor>();

  const passwordRecoverSubmit = async (params: PasswordRecoverInitValue) => {
    try {
      setLoading(true);
      const response = await clientService.userPasswordRecover(params);
      setSnackbarType('success');
      setResponseFromAPI(response);
      setShowSnackbar(true);
    } catch (error: any) {
      const resError: UserPasswordRecoverResponse = error.response;
      setSnackbarType('error');
      setResponseFromAPI(resError?.data?.message);
      setShowSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm imageSide={ImageSide.LEFT}>
      <div className="password_recover-container">
        <h1 className="password_recover-heading">Password Recover</h1>
        <img className="password_recover-img" src="/imgs/password-recover.svg" alt="" width={200} />
        <div className="password_recover-title">Send to Gara-Auto Dream email address</div>
        <div className="password_recover-description">
          Please enter the email address of the account you want to recover
        </div>

        <FormValidation
          initialValues={{ email: '' }}
          validationSchema={Auth.clientPasswordRecoverSchema}
          onSubmit={(values: PasswordRecoverInitValue, { setSubmitting }) => {
            passwordRecoverSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, touched, errors, values, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="password_recover-form">
              <CustomTextField
                id="outlined-email"
                label="Email"
                type="text"
                variant="outlined"
                value={values.email}
                name="email"
                style={{ marginTop: '2rem', marginBottom: '1rem' }}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="arronramsey@hotmail.com"
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <MuiButton variant="contained" type="submit" disabled={loading} style={SubmitButtonStyle}>
                {!loading ? 'Start' : <CircularProgress sx={{ color: '#fff', padding: '6px' }} />}
              </MuiButton>
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
