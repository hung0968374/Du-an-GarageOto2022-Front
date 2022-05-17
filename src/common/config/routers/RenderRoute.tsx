import React from 'react';

import { Account } from '../../../pages/client/Account/Account';
import { LogIn } from '../../../pages/client/auth/logIn/LogIn';
import { NewPassword } from '../../../pages/client/auth/newPassword/NewPassword';
import { PasswordRecover } from '../../../pages/client/auth/passwordRecover/PasswordRecover';
import { SignUp } from '../../../pages/client/auth/signUp/SignUp';
import { SignUpSuccess } from '../../../pages/client/auth/signUpSuccess/SignUpSuccess';
import { Blogs } from '../../../pages/client/blog/Blogs';
import { BlogItem } from '../../../pages/client/blog/BlogItem';
import { Brand } from '../../../pages/client/brand/Brand';
import { BrandItem } from '../../../pages/client/brandItem/BrandItem';
import CarDetail from '../../../pages/client/carDetail/CarDetail';
import { Home } from '../../../pages/client/common/Home';
import ErrorPages from '../../../pages/Error/ErrorPages';
import { routerPath } from '../../constants/routerPath';
import { getRefreshToken } from '../../helper/storage';
import { RouteAttributes } from '../interface/route';
import { EditorComponent } from '../../../pages/client/blog/Editor';

const staticRoute: RouteAttributes[] = [
  {
    authorized: false,
    element: <Home />,
    path: routerPath.common.HOME,
    needNavigator: true,
  },
  {
    authorized: false,
    element: <ErrorPages />,
    path: routerPath.common.ERROR,
    needNavigator: false,
  },
  {
    authorized: false,
    element: <CarDetail />,
    path: routerPath.common.CAR_DETAIL,
    needNavigator: true,
  },
  {
    authorized: false,
    element: <Brand />,
    path: routerPath.common.BRAND,
    needNavigator: true,
  },
  {
    authorized: false,
    element: <BrandItem />,
    path: routerPath.common.BRAND_ITEM,
    needNavigator: true,
  },
  {
    authorized: false,
    element: <Blogs />,
    path: routerPath.common.BLOGS,
    needNavigator: true,
  },
  {
    authorized: false,
    element: <BlogItem />,
    path: routerPath.common.BLOG_ITEM,
    needNavigator: true,
  },
  {
    authorized: false,
    element: <EditorComponent />,
    path: routerPath.common.EDIT,
    needNavigator: true,
  },
  {
    authorized: true,
    element: <Account />,
    path: routerPath.auth.MY_ACCOUNT,
    needNavigator: true,
  },
];

const deletedRoute: RouteAttributes[] = [
  {
    authorized: false,
    element: <LogIn />,
    path: routerPath.auth.LOG_IN,
    needNavigator: false,
  },
  {
    authorized: false,
    element: <PasswordRecover />,
    path: routerPath.auth.PASSWORD_RECOVER,
    needNavigator: false,
  },
  {
    authorized: true,
    element: <NewPassword />,
    path: routerPath.auth.NEW_PASSWORD,
    needNavigator: false,
  },
  {
    authorized: false,
    element: <SignUp />,
    path: routerPath.auth.SIGN_UP,
    needNavigator: false,
  },
  {
    authorized: false,
    element: <SignUpSuccess />,
    path: routerPath.auth.SIGN_UP_SUCCESS,
    needNavigator: false,
  },
];

const token = getRefreshToken();

export const RenderRoute = (): RouteAttributes[] => {
  if (token) {
    return [...staticRoute];
  }
  return [...staticRoute, ...deletedRoute];
};
