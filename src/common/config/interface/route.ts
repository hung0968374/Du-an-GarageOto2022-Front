import { ReactNode } from 'react';

export interface RouteAttributes {
  path: string;
  element: ReactNode;
  authorized: boolean;
  needNavigator: boolean;
}
