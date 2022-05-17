import React from 'react';
import { Skeleton, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/ReduxHook';
import { setLoading } from '../../../../reduxToolKit-Saga/common/General/GeneralSlice';
import { RootState } from '../../../../reduxToolKit-Saga/store';
import { PaymentReceipt } from '../../../../reduxToolKit-Saga/types/auth';
import clientService from '../../../../services/clientService';

import { HistoryItem } from './HistoryItem';

const History = () => {
  const [receipts, setReceipts] = React.useState<PaymentReceipt[]>();
  const { loading } = useAppSelector((globalState: RootState) => globalState.general);
  const dispatch = useAppDispatch();

  const fetchReceipts = async () => {
    try {
      dispatch(setLoading(true));
      const response = await clientService.getPaymentReceipt();
      setReceipts(response);
    } catch (error) {
      console.log('error: ', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  React.useEffect(() => {
    fetchReceipts();
  }, []);

  return (
    <div>
      <p className="text-guild-line">Bought History</p>
      {receipts &&
        receipts.length !== 0 &&
        !loading &&
        receipts.map((each, index) => <HistoryItem receipts={each} key={index} />)}

      {loading && (
        <Grid container className="bought-card">
          <Grid item md={4} sm={12} className="bought-card-image">
            <Skeleton variant="rectangular" width="100%" height="100%" />
          </Grid>
          <Grid item md={8} sm={12} className="bought-card-info">
            <Skeleton variant="text" height="3rem" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      )}

      {!receipts ||
        (receipts.length === 0 && (
          <div className="flex flex-col items-center">
            <p className="mb-2">You haven&apos;t bought anything</p>
            <p>Let buy some then come back here</p>
            <div className="bought-history-image"></div>
          </div>
        ))}
    </div>
  );
};

export default History;
