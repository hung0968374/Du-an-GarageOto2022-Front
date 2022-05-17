import React from 'react';

import './AuthForm.scss';

export enum ImageSide {
  RIGHT = 'Right',
  LEFT = 'Left',
}

interface AuthFormProps {
  children: React.ReactNode;
  imageSide: ImageSide;
}

export const AuthForm: React.FC<AuthFormProps> = ({ children, imageSide }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-decorator">
        <div className="decor-circle decor-circle_1"></div>
        <div className="decor-circle decor-circle_2"></div>
        <div className="decor-circle decor-circle_3"></div>
        <div className="decor-circle decor-circle_4"></div>
        <div className="decor-circle decor-circle_5"></div>
      </div>
      <div className={`auth-container ${imageSide === ImageSide.LEFT ? '' : 'flex-row-reverse'} `}>
        <div
          className={`auth-img_side ${imageSide === ImageSide.LEFT ? 'auth-img_side-left' : 'auth-img_side-right'} `}
        >
          <img
            src="/imgs/sign-in.svg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'contain', paddingInline: '2rem' }}
            loading="eager"
          />
        </div>
        <div className="auth-form_side">{children}</div>
      </div>
    </div>
  );
};
