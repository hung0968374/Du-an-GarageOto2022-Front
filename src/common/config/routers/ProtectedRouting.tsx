import React, { useLayoutEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { ModalComponents } from '../../../components/Modal/ModalComponents';
import { AuthenticationStatus } from '../../../reduxToolKit-Saga/types/auth';
import { getCookie } from '../../helper/storage';
import { useAppDispatch, useAppSelector } from '../../hooks/ReduxHook';
import { logOut } from '../../../reduxToolKit-Saga/auth/LoginSlice';

export const ProtectedRouting: React.FunctionComponent = () => {
  const token = getCookie('token');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const authorizedState = useAppSelector((globalState) => globalState.login.status);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (token && token !== '' && authorizedState === AuthenticationStatus.Authorized) {
      setIsAuthorized(true);
    } else {
      dispatch(logOut());
    }
  }, [isAuthorized, authorizedState, token]);

  return isAuthorized ? (
    <Outlet />
  ) : (
    <ModalComponents isOpen={true} styling={{}}>
      <Link to="/home"> Click to redirect to Home</Link>
    </ModalComponents>
  );
};
