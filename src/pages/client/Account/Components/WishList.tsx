import { Button, Grid, Skeleton } from '@mui/material';
import React from 'react';
import { ModeEdit, Save, Cancel } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/ReduxHook';
import { ColorSchema } from '../../../../components/MuiStyling/MuiStyling';
import { RootState } from '../../../../reduxToolKit-Saga/store';
import { setLoading } from '../../../../reduxToolKit-Saga/common/General/GeneralSlice';
import { CustomSnackbar } from '../../../../components/Snackbar/CustomSnackbar';
import { useFetch } from '../../../../common/hooks/DataFeching';
import clientAPI from '../../../../common/constants/clientAPI';
import { adjustList, resetSafeDeleteList } from '../../../../reduxToolKit-Saga/common/User/ClientSlice';

import { WishListItem } from './WishListItem';

interface UpdateWishListProps {
  listCarId: number[];
  takeAction: boolean;
}

const WishList = () => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [openSnackBar, setOpenSnackBar] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const { wishlist, safeDeleteWishList } = useAppSelector((globalState: RootState) => globalState.clientInfo);
  const [outputData, errorMessage, setInputData, setStartFetching] = useFetch<string, UpdateWishListProps>(
    clientAPI.updateClientWishList,
    'PATCH',
    undefined,
    true,
  );
  const { loading } = useAppSelector((globalState: RootState) => globalState.general);
  const dispatch = useAppDispatch();
  console.log('outputData: ', outputData);

  const renderEmptyList = (): JSX.Element => {
    return (
      <div className="flex flex-col items-center">
        <p className="mb-2">Haven&apos;t got something in mind?</p>
        <p>Add some then come back here</p>
        <div className="wishlist-image"></div>
      </div>
    );
  };

  React.useEffect(() => {
    if (outputData) {
      setMessage(outputData);
      setOpenSnackBar(true);
    }
  }, [outputData]);

  const handleEditing = async () => {
    setIsEditing((prev) => !prev);

    if (isEditing) {
      //TODO: call backend here
      try {
        dispatch(setLoading(true));
        dispatch(adjustList());
        setInputData({
          listCarId: wishlist.map((item) => item.carId),
          takeAction: true,
        });
        setStartFetching(true);
      } catch (error) {
        console.log('error: ', error);
        let errorLog = 'Something went wrong please try again';
        if (errorMessage) {
          errorLog = errorMessage;
        }
        setMessage(errorLog);
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  return (
    <>
      <p className="text-guild-line">WishList</p>
      {wishlist.length === 0 && !loading && renderEmptyList()}
      <div className="relative mb-5">
        {wishlist.length !== 0 ||
          (safeDeleteWishList.length !== 0 && (
            <Button
              variant="contained"
              sx={{ backgroundColor: ColorSchema.LightGreen }}
              endIcon={isEditing ? <Save /> : <ModeEdit />}
              onClick={handleEditing}
            >
              {isEditing ? 'Save' : 'Edit'}
            </Button>
          ))}

        {isEditing && (
          <Button
            variant="contained"
            sx={{ backgroundColor: ColorSchema.Red, position: 'absolute', right: 0 }}
            endIcon={<Cancel />}
            onClick={() => {
              dispatch(resetSafeDeleteList());
              setIsEditing((prev) => !prev);
            }}
          >
            cancel
          </Button>
        )}
      </div>

      {wishlist.length !== 0 && !loading && (
        <>
          {wishlist.map((each, index) => {
            if (safeDeleteWishList.includes(each.carId)) {
              return <></>;
            }
            return <WishListItem key={index} item={each} isEditing={isEditing} />;
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

      <CustomSnackbar
        open={openSnackBar}
        res={message}
        setOpen={setOpenSnackBar}
        key="unique"
        snackbarColor={message.includes('success') ? 'success' : 'error'}
        verticalPosition="bottom"
      />
    </>
  );
};

export default WishList;
