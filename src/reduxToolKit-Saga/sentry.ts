import * as Sentry from '@sentry/react';

import { RootState } from './store';

export const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
  configureScopeWithState: (scope, state: RootState) => {
    if (state.login.loginStatus !== null) {
      scope.setUser({ username: 'client' });
    } else {
      scope.clear();
    }
  },
});
