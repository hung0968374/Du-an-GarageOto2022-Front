import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '../../hooks/ReduxHook';

export const CheckAuthConstantly = () => {
  const userStatus = useAppSelector((globalState) => globalState.login.status);
  const unauthorized = userStatus === 'Unauthorized';
  const location = useLocation();

  if (unauthorized) {
    return <Navigate to="/home" state={{ from: location }} />;
  } else {
    return <Outlet />;
  }
};
