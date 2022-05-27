import React from 'react';
import { Navigate, Route as Channel, Routes as Switch } from 'react-router-dom';
import '../src/common/sass/App.scss';

import { ProtectedRouting } from './common/config/routers/ProtectedRouting';
import { RouteAttributes } from './common/config/interface/route';
import { RenderRoute } from './common/config/routers/RenderRoute';
import { routerPath } from './common/constants/routerPath';
import Navbar from './components/Navbar/Navbar';
import { CheckAuthConstantly } from './common/config/routers/CheckAuthConstantly';

function App() {
  const renderWithNav = (navigator: boolean, path: string, element: React.ReactNode, index: number) => {
    if (navigator) {
      return (
        <Channel path={path} key={index} element={<Navbar />}>
          <Channel key={index} path={path} element={element} />
        </Channel>
      );
    }

    return (
      <>
        <Channel path={path} element={element} key={index} />;
      </>
    );
  };

  return (
    <Switch>
      {RenderRoute().map((route: RouteAttributes, index: number) => {
        if (route.authorized) {
          return (
            <Channel path={route.path} key={index} element={<ProtectedRouting />}>
              {renderWithNav(route.needNavigator, route.path, route.element, index)}
            </Channel>
          );
        } else if (route.needImmidiateAuth) {
          <Channel path={route.path} key={index} element={<CheckAuthConstantly />}>
            {renderWithNav(route.needNavigator, route.path, route.element, index)}
          </Channel>;
        }
        return <>{renderWithNav(route.needNavigator, route.path, route.element, index)}</>;
      })}
      <Channel path="*" element={<Navigate to={routerPath.common.HOME} />} />
    </Switch>
  );
}

export default App;
