import { Checkbox, FormControlLabel, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import clientAPI from '../../../../common/constants/clientAPI';
import { routerPath } from '../../../../common/constants/routerPath';
import { useFetch } from '../../../../common/hooks/DataFeching';
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/ReduxHook';
import { ColorSchema, MuiButton } from '../../../../components/MuiStyling/MuiStyling';
import { resetPaymentId } from '../../../../reduxToolKit-Saga/common/General/GeneralSlice';
import { RootState } from '../../../../reduxToolKit-Saga/store';
import { GetOneCarReturn } from '../../../../reduxToolKit-Saga/types/auth';
import { Tab } from '../Account';

interface PaymentProps {
  setOpenSnackBar: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackBarMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const Payment: React.FC<PaymentProps> = ({ setOpenSnackBar, setSnackBarMessage }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { carPaymentId } = useAppSelector((globalState: RootState) => globalState.general);
  const [checkBoxStatus, setCheckBoxStatus] = React.useState<boolean>(false);
  const [car, , , setStartFetch] = useFetch<GetOneCarReturn, any>(
    clientAPI.getCarByID(carPaymentId),
    'GET',
    undefined,
    false,
  );

  const [message, errorMessage, setInputData, setSendingReceipt] = useFetch<string, any>(
    clientAPI.processPayment,
    'POST',
    undefined,
    true,
  );

  React.useEffect(() => {
    if (message) {
      dispatch(resetPaymentId());
      setSnackBarMessage('Sending receipt successfully, you can check via mail');
      setOpenSnackBar((prev) => !prev);
      setTimeout(() => {
        navigate(routerPath.auth.MY_ACCOUNT, { state: { component: Tab.HISTORY } });
      }, 500);
    }
  }, [message, setSnackBarMessage, setOpenSnackBar, dispatch, navigate]);

  React.useEffect(() => {
    if (carPaymentId) {
      setStartFetch(true);
      setInputData({
        carId: carPaymentId,
        quantity: 1,
      });
    }
  }, [carPaymentId, setStartFetch, setInputData]);

  React.useEffect(() => {
    if (errorMessage) {
      setSnackBarMessage('Something went wrong when sending receipt');
      setOpenSnackBar((prev) => !prev);
    }
  }, [errorMessage, setSnackBarMessage, setOpenSnackBar]);

  const handleClickPayment = () => {
    if (!checkBoxStatus) {
      setSnackBarMessage('Something went wrong, please accept with the terms');
      setOpenSnackBar((prev) => !prev);
      return;
    }
    setSendingReceipt(true);
  };

  return (
    <>
      <p className="text-guild-line">payment</p>
      {car && (
        <div className="payment-tab-receipt-sheet">
          <p className="text-subheader text-xl">{car.name}</p>
          <img src={car.imgs} alt={car.name} className="mx-auto my-6" />
          <p className="mb-1">With basic information:</p>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Brand</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.brand}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Capacity</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.capacity}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Design</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.design}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Engine</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.engine}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Gear</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.gear}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Seats</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.seats}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Manufacture</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.yearOfManufacture}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                  <span className="font-poppin font-semibold">Percent of Discount</span>
                </TableCell>
                <TableCell component="th" scope="row">
                  {car.discountPercent + '%'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="flex my-6">
            Total price: <span className="ml-auto text-red-500">{car.price}</span>
          </p>
          <p className="text-sm text-justify">
            This is just a small piece of information of current product in payment tab. In order to see the specific
            information you need to access this product through a link .Please read carefully and tick the following
            checkbox
          </p>
          <div className="flex justify-end mt-2 mb-6">
            <FormControlLabel
              label="I'm agree"
              control={
                <Checkbox
                  sx={{
                    color: ColorSchema.LightGreen,
                    '&.Mui-checked': {
                      color: ColorSchema.LightGreen,
                    },
                    margin: 0,
                  }}
                  checked={checkBoxStatus}
                  onClick={() => setCheckBoxStatus((prev) => !prev)}
                />
              }
            />
          </div>
          <div className="flex justify-center mt-6">
            <MuiButton sx={{ paddingInline: '6rem', textTransform: 'capitalize' }} onClick={handleClickPayment}>
              Proceed
            </MuiButton>
          </div>
        </div>
      )}
    </>
  );
};
