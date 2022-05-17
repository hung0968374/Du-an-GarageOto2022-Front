import React from 'react';
import { Formik as FormValidation } from 'formik';
import { AlertColor, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

import { AuthForm, ImageSide } from '../../../../components/AuthForm/AuthForm';
import './NewPassword.scss';
import Auth from '../../../../common/interfaces/Auth';
import { CustomTextField, MuiButton, SubmitButtonStyle } from '../../../../components/MuiStyling/MuiStyling';
import { UserNewPasswordResponse } from '../../../../reduxToolKit-Saga/types/auth';
import clientService from '../../../../services/clientService';
import { CustomSnackbar } from '../../../../components/Snackbar/CustomSnackbar';
import { routerPath } from '../../../../common/constants/routerPath';

interface NewPasswordInitValue {
  password: string;
  retypePassword?: string;
}

export const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);
  const [showSnackbar, setShowSnackbar] = React.useState(false);
  const [responseFromAPI, setResponseFromAPI] = React.useState('');
  const [snackbarType, setSnackbarType] = React.useState<AlertColor>();

  const newPasswordSubmit = async (params: NewPasswordInitValue) => {
    // delete params?.retypePassword;
    const onlyPassword: NewPasswordInitValue = {
      password: params.password,
    };

    try {
      setLoading(true);
      const response = await clientService.userNewPassword(token as string, onlyPassword);
      setSnackbarType('success');
      setResponseFromAPI(response?.message);
      setShowSnackbar(true);
    } catch (error: any) {
      const resError: UserNewPasswordResponse = error.response;
      setSnackbarType('error');
      setResponseFromAPI(resError?.data?.message);
      setShowSnackbar(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        navigate(routerPath.auth.LOG_IN);
      }, 5000);
    }
  };

  return (
    <AuthForm imageSide={ImageSide.LEFT}>
      <div className="new_password-container">
        <h1 className="new_password-heading">Recover Account</h1>
        <img className="new_password-img" src="/imgs/new-password.svg" alt="" width={200} />
        <div className="new_password-title">Reset account and use your email address</div>
        <div className="new_password-description">Please enter a new password for your account</div>

        <FormValidation
          initialValues={{ password: '', retypePassword: '' }}
          validationSchema={Auth.clientNewPasswordSchema}
          onSubmit={async (values: NewPasswordInitValue, { setSubmitting }) => {
            await newPasswordSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ handleChange, handleBlur, touched, errors, values, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="new_password-form">
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
                value={values.retypePassword}
                name="retypePassword"
                style={{ marginBottom: '1rem' }}
                placeholder="ArronRamsey1234!@"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.retypePassword && Boolean(errors.retypePassword)}
                helperText={touched.retypePassword && errors.retypePassword}
              />

              <MuiButton variant="contained" type="submit" disabled={loading} style={SubmitButtonStyle}>
                {loading === false ? 'Confirm' : <CircularProgress sx={{ color: '#fff', padding: '6px' }} />}
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
