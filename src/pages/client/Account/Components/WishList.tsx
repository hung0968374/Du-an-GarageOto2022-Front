import { Button, Grid, Skeleton } from '@mui/material';
import React from 'react';
import { ModeEdit, Save } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/ReduxHook';
import { ColorSchema } from '../../../../components/MuiStyling/MuiStyling';
import { RootState } from '../../../../reduxToolKit-Saga/store';
import { setLoading } from '../../../../reduxToolKit-Saga/common/General/GeneralSlice';
import { CustomSnackbar } from '../../../../components/Snackbar/CustomSnackbar';

import { WishListItem } from './WishListItem';

const WishList = () => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const wishList = useAppSelector((globalState: RootState) => globalState.wishlist.list);
  const { loading } = useAppSelector((globalState: RootState) => globalState.general);
  const dispatch = useAppDispatch();

  const renderEmptyList = (): JSX.Element => {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-2">Haven&apos;t got something in mind?</p>
        <p>Add some then come back here</p>
        <div className="wishlist-image"></div>
      </div>
    );
  };

  const handleEditing = async () => {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      //TODO: call backend here
      try {
        dispatch(setLoading(true));
        setMessage('Data saved');
      } catch (error) {
        console.log('error: ', error);
        setMessage('Something went wrong please try again');
      } finally {
        dispatch(setLoading(false));
        setOpenSnackBar(true);
      }
    }
  };

  return (
    <>
      <p className="text-guild-line">WishList</p>
      {wishList.length === 0 && !loading && renderEmptyList()}
      {wishList.length !== 0 && !loading && (
        <>
          <Button
            variant="contained"
            sx={{ backgroundColor: ColorSchema.LightGreen, marginBottom: '1.25rem' }}
            endIcon={isEditing ? <Save /> : <ModeEdit />}
            onClick={handleEditing}
          >
            {isEditing ? 'Save' : 'Edit'}
          </Button>
          {wishList.map((each, index) => (
            <WishListItem key={index} item={each} isEditing={isEditing} />
          ))}
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

      <CustomSnackbar
        open={openSnackBar}
        res={message}
        setOpen={setOpenSnackBar}
        key="unique"
        snackbarColor={message.includes('saved') ? 'success' : 'error'}
        verticalPosition="bottom"
      />
    </>
  );
};

export default WishList;
