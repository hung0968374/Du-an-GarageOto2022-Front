import React from 'react';
import { Grid, Skeleton } from '@mui/material';

import { useAppSelector } from '../../../../common/hooks/ReduxHook';
import { RootState } from '../../../../redux/store';

import { WishListItem } from './WishListItem';

const WishList = () => {
  const { wishlist } = useAppSelector((globalState: RootState) => globalState.clientInfo);
  const { loading } = useAppSelector((globalState: RootState) => globalState.general);

  const renderEmptyList = (): JSX.Element => {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-2">Haven&apos;t got anything in mind?</p>
        <p>Add some then come back here</p>
        <div className="wishlist-image"></div>
      </div>
    );
  };

  return (
    <>
      <p className="text-guild-line">WishList</p>
      {wishlist.length === 0 && !loading && renderEmptyList()}
      {wishlist.length !== 0 && !loading && (
        <>
          {wishlist.map((each, index) => {
            return <WishListItem key={index} item={each} />;
          })}
        </>
      )}

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
    </>
  );
};

export default WishList;
