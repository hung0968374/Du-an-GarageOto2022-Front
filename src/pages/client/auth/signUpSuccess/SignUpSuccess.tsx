import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { routerPath } from '../../../../common/constants/routerPath';
import { AuthForm, ImageSide } from '../../../../components/AuthForm/AuthForm';
import { MuiButton, SubmitButtonStyle } from '../../../../components/MuiStyling/MuiStyling';
import clientService from '../../../../services/clientService';
import './SignUpSuccess.scss';

export const SignUpSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const handleClickSignInButton = () => {
    navigate(routerPath.auth.LOG_IN);
  };

  React.useEffect(() => {
    clientService.userSignUpSuccess(token as string);
  }, [token]);

  return (
    <AuthForm imageSide={ImageSide.RIGHT}>
      <div className="sign_up_success-container">
        <div className="sign_up_success-heading">Gara-Auto Dream</div>
        <img className="sign_up_success-img" src="/imgs/sign-in-success.svg" alt="" width={200} />
        <div className="sign_up_success-title">Your account has been activated</div>
        <div className="sign_up_success-description">Now you can log in to your account to use</div>
        <MuiButton
          onClick={handleClickSignInButton}
          variant="contained"
          type="submit"
          style={SubmitButtonStyle && { display: 'block', margin: 'auto' }}
        >
          Sign in
        </MuiButton>
      </div>
    </AuthForm>
  );
};
