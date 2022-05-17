import React from 'react';
import ReactDOM from 'react-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import useRoutingInstrumentation from 'react-router-v6-instrumentation';
import { BrowserTracing } from '@sentry/tracing';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/react';
import { BrowserRouter } from 'react-router-dom';

import { persistor, store } from './reduxToolKit-Saga/store';
import env from './common/config/interface/env';
import '../src/common/sass/index.css';
import App from './App';

function Application() {
  return <App />;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Application />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
