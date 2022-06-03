import React from 'react';
import MoreIcon from '@mui/icons-material/More';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Grid } from '@mui/material';
import moment from 'moment';

import { ColorSchema } from '../../../../common/components/MuiStyling/MuiStyling';
import { PaymentReceipt } from '../../../../redux/types/auth';
import { mapBrandIdToName } from '../../../../common/helper/brand';

interface HistoryItemProps {
  receipts: PaymentReceipt;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ receipts }) => {
  const [seeMore, setSeeMore] = React.useState<boolean>(false);
  const handleClickSeeMore = () => {
    setSeeMore((prev) => !prev);
  };
  if (!(Object.keys(receipts)?.length > 0)) {
    return <></>;
  }

  return (
    <>
      <Grid container className="bought-card">
        <Grid item md={4} sm={12} className="bought-card-image">
          <img src={receipts.car.carAppearance.imgs} alt={receipts?.car?.name} />
        </Grid>
        <Grid item md={8} sm={12} className="bought-card-info">
          <p>{receipts.car.name}</p>
          <p>Price: {receipts.car.price}</p>
          <p>Brand: {receipts?.car?.brand?.name || 'Updating'}</p>
          <p>Quantity: {receipts.quantity}</p>
          {!seeMore ? (
            <p className="text-right" onClick={handleClickSeeMore}>
              <MoreIcon sx={{ color: ColorSchema.LightGreen, fontSize: '1.75rem' }} />
            </p>
          ) : (
            <>
              <p>Receipt ID: {receipts?.uuid}</p>
              <p>
                Bought At:{' '}
                {receipts?.createdAt === null ? moment().format('MMMM Do YYYY, h:mm:ss a') : receipts.createdAt}
              </p>
              <p className="text-right" onClick={handleClickSeeMore}>
                <ExpandLessIcon sx={{ color: ColorSchema.LightGreen, fontSize: '2rem' }} />
              </p>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};
