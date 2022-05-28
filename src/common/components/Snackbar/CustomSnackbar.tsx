import React from 'react';
import { Snackbar, Alert, AlertColor, SnackbarOrigin } from '@mui/material';

interface SnackbarProps {
  snackbarColor?: AlertColor;
  res: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  verticalPosition?: SnackbarOrigin['vertical'];
}

export const CustomSnackbar = ({ snackbarColor, res, open, setOpen, verticalPosition }: SnackbarProps) => {
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: `${verticalPosition ? verticalPosition : 'top'}`,
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackbarColor} sx={{ width: '100%' }}>
          {res}
        </Alert>
      </Snackbar>
    </>
  );
};
