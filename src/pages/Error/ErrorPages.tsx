import React from 'react';
import { captureMessage, init, Severity, showReportDialog } from '@sentry/react';
import { Link, useLocation } from 'react-router-dom';

import env from '../../common/config/interface/env';
import { MuiButton } from '../../components/MuiStyling/MuiStyling';
import { routerPath } from '../../common/constants/routerPath';

const ErrorPages: React.FC = () => {
  //TODO: Refactor code to send Error to sentry when redirect to this Page
  const { state }: any = useLocation();
  const currentLocation = () => {
    if (state !== null) {
      return state.location;
    }
    return null;
  };

  init({
    dsn: env.reactSentryDNS,
    tracesSampleRate: 1.0,
    normalizeDepth: 10,
    environment: env.environment,
    beforeSend(event) {
      // Check if it is an exception, and if so, show the report dialog
      showReportDialog({ eventId: event.event_id });
      captureMessage(`EXCEPTION at location ${currentLocation()}`, { level: Severity.Fatal });
      return event;
    },
  });

  return (
    <div>
      <MuiButton>
        <Link to={routerPath.common.HOME}>Return Home</Link>
      </MuiButton>
    </div>
  );
};

export default ErrorPages;
